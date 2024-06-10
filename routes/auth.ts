import { Router } from "express";
import { login } from "../controllers/login.midlleware";
import { registerUser } from "../controllers/signup.middleware";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", registerUser);

export default authRouter;
