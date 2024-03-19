import express from "express"
import userRouter from "./routesControllers/User.routes"
import { json } from "express"
import cors from "cors"
const app = express()

app.use(json())
app.use(
  cors({
    origin: "*",
  }),
)


app.use("/api", userRouter)

app.listen(3000, () => console.log("runniing..."))
