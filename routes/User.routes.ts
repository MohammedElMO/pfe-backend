import { Router } from "express";
import { getUser } from "../routesControllers/userController";
import { UserRoutes } from "../constants/routes";

const userRouter = Router()


userRouter.get(UserRoutes.GET_USER, getUser)
