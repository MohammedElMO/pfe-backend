import { Router } from "express"
import db from "../prisma/client"
import { AuthtokenVerification } from "../middlewares/auth.middleware"

const userRouter = Router()
userRouter.use(AuthtokenVerification)

userRouter.put("/username", async (req, res) => {
  const { username } = req.body

  const user = await db.user.findUnique({
    where: {
      uesrname: username,
    },
    select: {
      uesrname: true,
    },
  })
  console.log(user)
  if (!user) return res.json({ userFound: false }).status(200)

  return res.json({ userFound: true }).status(200)
})

export default userRouter
