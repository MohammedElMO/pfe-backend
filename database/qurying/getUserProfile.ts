import { RowDataPacket } from "mysql2"
import { db } from "../connction"
import { User } from "./getOneUser"

export const  getUserProfile = async(id:number) => {
    
   const [profile] =  await db.query<RowDataPacket[]>("SELECT * FROM User WHERE id = ?",id)

   return (profile as User[])
}