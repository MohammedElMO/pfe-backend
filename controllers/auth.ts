import { Router } from "express"
// import { AuthtokenVerification } from "../middlewares/auth/auth.middleware"
import { login } from "../middlewares/auth/login.midlleware"
import { registerUser } from "../middlewares/auth/signup.middleware"

const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/signup", registerUser)

// authRouter.get("/profile/:id", AuthtokenVerification, getProfile)

export default authRouter
