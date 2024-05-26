import express from "express"
import authRouter from "./controllers/auth"
import userRouter from "./controllers/user"
import { json } from "express"
import cors from "cors"
// import cookieParser from "cookie-parser"
import ProfileRouter from "./controllers/profile"
import FavouritesRouter from "./controllers/favourites"
import PharmacyCity from "./controllers/city"
const app = express()

app.use(
  cors({
    origin: "https://pfe-khaliha-3la-lah.vercel.app/",
  }),
)
// "http://localhost:5173"
app.use(json())
// app.use(cookieParser())

app.use("/api", authRouter, ProfileRouter, FavouritesRouter, PharmacyCity)
app.use("/api/user", userRouter)

app.listen(process.env.PORT || 3000, () => console.log("runniing..."))
