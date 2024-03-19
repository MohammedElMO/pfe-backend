import { RowDataPacket } from "mysql2"
import { db } from "../../database/connction"

export type User = {
  email: string
  password: string
  userId: number
  fullName: string
}
// type ArrayElem<T> = T extends (infer U)[] ? U : never
export const getOneUserByCredentials = async (
  fullName: string,
  // password: string,
) => {
  const [data] = await db.query<RowDataPacket[]>(
    "SELECT userId,fullName,password from User WHERE fullName = ? ",
    [fullName],
  )
  return data 
}
