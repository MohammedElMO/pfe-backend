import { Router } from "express"
import { AuthtokenVerification } from "../middlewares/auth_/auth.middleware"
import { login, getProfile } from "../middlewares/auth_/login.midlleware"

const userRouter = Router({
  strict: true,
})

userRouter.post("/login", login)
userRouter.get("/profile/:id", AuthtokenVerification, getProfile)

export default userRouter
