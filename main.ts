import express from "express"
import authRouter from "./controllers/auth"
import userRouter from "./controllers/user"
import { json } from "express"
import cors from "cors"
const app = express()

app.use(json())
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
)


app.use("/api", authRouter)
app.use("/api/user", userRouter)

app.listen(3000, () => console.log("runniing..."))
