import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import db from "../prisma/client"
export const refreshToken = asyncHandler(async (req, res) => {
  if (req.cookies?.jwt) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt
    // Verifying refresh token

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
      res.status(401).json({ message: "user not found" })
      return
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any) => {
      if (err) {
        // Wrong Refesh Token
        res.status(406).json({ message: "Unauthorized" })
        return
      } else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(
          {
            username: user?.uesrname,
            userId: user?.id_utilisateur,
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: "10m",
          },
        )
        res.json({ accessToken })
        return
      }
    })
  } else {
    res.status(406).json({ message: "Unauthorized" })
    return
  }
})
