import asyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import {
  User,
  getOneUserByCredentials,
} from "../../database/qurying/getOneUser"
import { getUserProfile } from "../../database/qurying/getUserProfile"
type LoginCredentialsT = {
  email: string
  password: string
}

export const login = asyncHandler(
  async (
    req: Request<any, any, LoginCredentialsT>,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.body?.email || !req.body?.password) {
      res.status(401).json({
        message: "no data was sent",
      })
      return
    }
    const { email, password } = req.body
    let user: User[]
    try {
      user = await getOneUserByCredentials(email, password)
    } catch (error) {
      res.send(401).json({ message: "authtification failed" })
    }

    let jwtToken = jwt.sign(
      {
        email: user![0].email,
        userId: user![0].id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    )
    res.status(200).json({
      accessToken: jwtToken,
      userId: user![0].id,
    })
  },
)

export const getProfile = asyncHandler(async (req, res, next) => {
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
        messgae: `user ${verifyUser[0].name}`,
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
