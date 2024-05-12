import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../prisma/client"

export const registerUser = asyncHandler(async (req, res) => {
  const { lastName, password, username, email, firstName } = req.body
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      const user = db.user.create({
        data: {
          email_utilisateur: email,
          prenom_utilisateur: firstName,
          nom_utilisateur: lastName,
          password_utilisateur: hash,
          uesrname: username,
        },
      })

      user
        .then((response) => {
          let jwtToken = jwt.sign(
            { userId: response.id_utilisateur, username: response.uesrname },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1d",
            },
          )

          res.status(201).json({
            jwtToken,
            message: "user successfully created!",
          })
        })
        .catch((err) => {
          console.log(err)
          res.status(400).json({
            error: "error has occured at cration time",
          })
        })
    })
  } catch (error) {
    res.status(500).send({
      message: "failed to create the user",
    })
  }
})
