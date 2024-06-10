import express from "express"
import authRouter from "./routes/auth"
import userRouter from "./routes/user"
import { json } from "express"
import cors from "cors"
// import cookieParser from "cookie-parser"
import ProfileRouter from "./routes/profile"
import FavouritesRouter from "./routes/favourites"
import PharmacyCity from "./routes/city"
const app = express()

app.use(
  cors({
    origin: "*",
  }),
)
// "http://localhost:5173"
app.use(json())
// app.use(cookieParser())

app.use("/api", authRouter, ProfileRouter, FavouritesRouter, PharmacyCity)
app.use("/api/user", userRouter)

app.listen(process.env.PORT || 3000, () => console.log("runniing..."))
