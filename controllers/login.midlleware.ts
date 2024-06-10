import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import db from "../prisma/client"
import { z } from "zod"
type LoginCredentialsT = {
  username: string
  password: string
}
const loginSchema = z.object({
  username: z.string().max(25),
  password: z.string().max(255),
})

export const login = asyncHandler(
  async (req: Request<LoginCredentialsT>, res: Response) => {
    try {
      if (!req.body.username || !req.body.password) {
        res.status(400).json({
          message: "no data was sent",
        })
      }
      const isValid = loginSchema.safeParse(req.body)

      if (!isValid.success) {
        res.status(400).json({ message: "bad request data invalid" })
        return
      }

      const user = await db.user.findUnique({
        where: {
          username: req.body.username,
        },
        select: {
          id_utilisateur: true,
          username: true,
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
            username: user.username,
            userId: user.id_utilisateur,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: "1d",
          },
        )

        res.status(200).json({ jwtToken })
      }
    } catch (error) {
      res.json("err occured try again").status(500)
    }
  },
)
