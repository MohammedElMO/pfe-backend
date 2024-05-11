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
  async (req: Request<any, any, LoginCredentialsT>, res: Response) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({
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
      res.status(401).json({ message: "authtification failed" })
      return
    }

    const isCorrectPass = await bcrypt.compare(
      req.body.password,
      user.password_utilisateur,
    )

    if (!isCorrectPass)
      res.status(401).json({
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

      res.json({ jwtToken }).status(200)
    }
  },
)
