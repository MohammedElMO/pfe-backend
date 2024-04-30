import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../../database/prisma/client"

export const registerUser = asyncHandler(async (req, res) => {
  const {
    lastName: lastname,
    password,
    username,
    firstName: firstname,
  } = req.body
  try {
    bcrypt.hash(password, 10).then((hash) => {
      const user = db.user.create({
        data: {
          username,
          firstname,
          lastname,
          account: {
            create: {
              password: hash,
            },
          },
        },
      })

      user
        .then((response) => {
          let jwtToken = jwt.sign(
            { userId: response.id, username: response.username },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1d",
            },
          )

          res.status(201).json({
            accessToken: jwtToken,
            userId: response.id,
            message: "user successfully created!",
          })
        })
        .catch(() => {
          res.status(400).json({
            error: "error has occured at cration time",
            success: false,
          })
        })
    })
  } catch (error) {
    res.status(500).send({
      message: "failed to create the user",
    })
  }
})
