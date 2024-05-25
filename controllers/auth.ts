import { Router } from "express"
import { login } from "../middlewares/login.midlleware"
import { registerUser } from "../middlewares/signup.middleware"

const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/signup", registerUser)


export default authRouter
