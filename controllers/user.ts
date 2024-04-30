import { Router } from "express"
import db from "../database/prisma/client"

const userRouter = Router()

userRouter.post("/username", async (req, res) => {
  const { user } = req.body
  console.log(user)

  const username = await db.user.findUnique({
    where: {
      username: user,
    },
    select: {
      username: true,
    },
  })
  if (!username) return res.json({ userFound: false }).status(200)

  return res.json({ userFound: true }).status(200)
})

export default userRouter
