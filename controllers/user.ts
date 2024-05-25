import { Router } from "express"
import db from "../prisma/client"
import { z } from "zod"

const userRouter = Router()

const schema = z.object({
  username: z.string().trim().min(1),
})

userRouter.put("/username", async (req, res) => {
  try {
    const { username } = req.body
    if (!schema.safeParse(req.body).success) {
      res.status(400).json({ message: "bad request data invalid" })
      return
    }

    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    })
    if (!user) return res.json({ userFound: false }).status(200)

    res.json({ userFound: true }).status(200)
    return
  } catch (error) {
    res.json("err occured try again").status(500)
    return
  }
})

export default userRouter
