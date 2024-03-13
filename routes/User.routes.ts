import { Router } from "express";
import {
  authentificateUser,
  getUser,
} from "../routesControllers/userController";
import { UserRoutes } from "../constants/routes";

const userRouter = Router({
    strict:true
})

userRouter.post(UserRoutes.POST_USER, authentificateUser);
userRouter.get(UserRoutes.GET_USER, getUser);


export default userRouter