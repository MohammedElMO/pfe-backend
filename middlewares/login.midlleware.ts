import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import db from "../prisma/client"

type LoginCredentialsT = {
  username: string
  password: string
}

export const login = asyncHandler(
  async (req: Request<LoginCredentialsT>, res: Response) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({
        message: "no data was sent",
      })
    }

    const user = await db.user.findUnique({
      where: {
        uesrname: req.body.username,
      },
      select: {
        id_utilisateur: true,
        uesrname: true,
        password_utilisateur: true,
      },
    })
    if (!user) {
      res.status(404).json({ message: "user not found" })
      return
    }

    const isCorrectPass = await bcrypt.compare(
      req.body.password,
      user.password_utilisateur,
    )

    if (!isCorrectPass)
      res.status(400).json({
        message: "password Incorrect",
      })
    else {
      let jwtToken = jwt.sign(
        {
          username: user.uesrname,
          userId: user.id_utilisateur,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
      )
      const refreshToken = jwt.sign(
        {
          username: user.uesrname,
        },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "1d" },
      )
      res.cookie("jwtRefresh", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })

      res.json({ jwtToken }).status(200)
    }
  },
)
