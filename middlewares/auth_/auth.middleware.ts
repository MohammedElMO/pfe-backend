import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const AuthtokenVerification = (req: Request & any, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers.authorization.replace("Bearer ", ""))
    const token = req.headers.authorization?.replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.userData = decoded;
    next()
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed",
    })
  }
}
