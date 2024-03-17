import { ResultSetHeader, RowDataPacket } from "mysql2"
import { db } from "../../database/connction"

export type User = {
  email: string
  password: string
  id: number
  name:string
}

export const getOneUserByCredentials = async (
  email: string,
  password: string,
) => {
  const [data] = await db.query<RowDataPacket[]>(
    "SELECT * from User WHERE email = ? AND password= ? ",
    [email, password],
  )
  return data as User[]
}
