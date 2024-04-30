import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import db from "../../database/prisma/client"

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
        username: req.body.username,
      },
      select: {
        id: true,
        username: true,
        account: {
          select: {
            password: true,
          },
        },
      },
    })
    console.log(user)
    console.log(req.body.password)
    if (!user) {
      res.status(401).json({ message: "authtification failed" })
      return
    }

    const isCorrectPass = await bcrypt.compare(
      req.body.password,
      user.account!.password,
    )

    if (!isCorrectPass)
      res.status(401).json({
        message: "password Incorrect ",
      })
    else {
      let jwtLoginToken = jwt.sign(
        {
          username: user.username,
          userId: user.id,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
      )
      res.json({ accessToken: jwtLoginToken }).status(200)
    }
  },
)

// export const getProfile = asyncHandler(async (req, res) => {
//   const { id } = req.params
//   console.log(id)

//   try {
//     let user = await getUserProfile(parseInt(id))
//     if (!user[0]) {
//       res.status(403).json({
//         message: "user not found",
//         success: false,
//       })
//     } else {
//       res.status(200).json({
//         user,
//         success: true,
//       })
//     }
//   } catch (error) {
//     res.status(401).json({
//       sucess: false,
//       message: "error",
//     })
//   }
// })
