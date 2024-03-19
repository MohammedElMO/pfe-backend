import asyncHandler from "express-async-handler"
import { getUserByEmail } from "../../database/qurying/getUserByEmail"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"
import { saveUser } from "../../database/saver/saveUser"
import jwt from "jsonwebtoken"

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body

  const isEmailExist = await getUserByEmail(email, res)
  console.log(isEmailExist)
  try {
    if (isEmailExist?.[0].length) {
      res.status(403).json({
        message: "Email already used",
      })
    } else {
      const userId = uuidv4()
      bcrypt.hash(password, 10).then((hash) => {
        const user = saveUser({
          userId,
          fullName,
          email,
          password: hash,
        })

        user
          .then((response) => {
            let jwtToken = jwt.sign(
              {
                fullName,
                userId,
              },
              process.env.JWT_SECRET!,
              {
                expiresIn: "1h",
              },
            )

            res.status(201).json({
              accessToken: jwtToken,
              userId: userId,
              message: "user successfully created!",
              result: response,
              success: true,
            })
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            })
          })
      })
    }
  } catch (error) {
    res.status(412).send({
      success: false,
      message: "failed to create user Account",
    })
  }
})
