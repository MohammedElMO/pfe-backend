import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {
  User,
  getOneUserByCredentials,
} from "../../database/qurying/getOneUser"
import { getUserProfile } from "../../database/qurying/getUserProfile"
type LoginCredentialsT = {
  fullName: string
  password: string
}

export const login = asyncHandler(
  async (req: Request<any, any, LoginCredentialsT>, res: Response) => {
    if (!req.body.fullName || !req.body.password) {
      res.status(401).json({
        message: "no data was sent",
      })
      return
    }

    let user: User[]

    getOneUserByCredentials(req.body.fullName)
      .then((resp) => {
        if (resp.length === 0) {
          res.status(401).json({ message: "authtification failed" })
        }
        user = resp as User[]
        return bcrypt.compare(req.body.password, user[0].password)
      })
      .then((response) => {
        console.log(response)
        if (!response) {
          return res.status(401).json({
            message: "password Incorrect ",
          })
        } else {
          let jwtToken = jwt.sign(
            {
              fullName: user[0].fullName,
              userId: user[0].userId,
            },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1h",
            },
          )
          res.status(200).json({
            accessToken: jwtToken,
            userId: user[0].userId,
          })
        }
      })
  },
)

export const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    let verifyUser = await getUserProfile(parseInt(id))
    if (!verifyUser[0]) {
      res.status(403).json({
        message: "user not found",
        success: false,
      })
    } else {
      res.status(200).json({
        messgae: `user ${verifyUser[0].fullName}`,
        success: true,
      })
    }
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: error,
    })
  }
})
