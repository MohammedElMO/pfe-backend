import Cookie from "@authentication/cookie"
import { Router } from "express"

const cookie = new Cookie<number>(
  /* cookie name */ "session_id",
  /* options */ {
    maxAge: "30 days",
    
  },

)
const router = Router()

router.use(cookie.refresh)


router.get("/set-cookie/:value", (req, res, next) => {
  cookie.set(req, res, parseInt(req.params.value, 10))
  res.send("cookie set")
})
router.get("/remove-cookie", (req, res, next) => {
  cookie.remove(req, res)
})
router.get("/get-cookie", (req, res, next) => {
  // value is `number | null`
  const value = cookie.get(req, res)
  res.json(value)
})