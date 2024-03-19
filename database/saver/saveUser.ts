import { ResultSetHeader } from "mysql2"
import { db } from "../connction"

type User = {
  userId: string
  fullName: string
  email: string
  password: string
}

export const saveUser = async ({ email, fullName, password, userId }: User) => {
  return await db.query<ResultSetHeader>("insert into User values (?,?,?,?)", [
    userId,
    fullName,
    email,
    password,
  ])
}
