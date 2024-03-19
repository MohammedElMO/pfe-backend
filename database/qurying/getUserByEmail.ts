import { Response } from "express"
import { db } from "../connction"
import { RowDataPacket } from "mysql2"

export const getUserByEmail = async (email: string,res:Response) => {
  try {
    return await db.query<RowDataPacket[]>(
      "SELECT email from User where email = ?",
      [email],
    )
  } catch (error) {
    res.status(500).json({
      message: "somthig went wrong!",
    })
  }
}
