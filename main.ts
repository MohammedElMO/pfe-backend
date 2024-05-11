import express from "express"
import authRouter from "./controllers/auth"
import userRouter from "./controllers/user"
import { json } from "express"
import cors from "cors"
import ProfileRouter from "./controllers/profile"
const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
)
app.use(json())

app.use("/api", authRouter,ProfileRouter)
app.use("/api/user", userRouter)
// app.use("/api", uploadRouter)

app.listen(3000, () => console.log("runniing..."))
