import { Router } from "express"
import { AuthtokenVerification } from "../middlewares/auth_/auth.middleware"
import { login, getProfile } from "../middlewares/auth_/login.midlleware"
import { registerUser } from "../middlewares/auth_/signup-middleware"

const userRouter = Router({})

userRouter.post("/login", login)
userRouter.post("/signup", registerUser)

userRouter.get("/profile/:id", AuthtokenVerification, getProfile)

export default userRouter
