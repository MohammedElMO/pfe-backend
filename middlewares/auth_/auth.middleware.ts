import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const AuthtokenVerification = (
  req: Request & any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "")
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.userData = decoded
    next()
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed",
    })
  }
}
