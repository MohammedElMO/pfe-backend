import { Router } from "express"
import { AuthtokenVerification } from "../middlewares/auth.middleware"
import { getAllCities, getPharmacyById } from "../middlewares/cities.middleware"

const PharmacyCity = Router()

PharmacyCity.get("/pharmacy/cities",AuthtokenVerification,getAllCities)
PharmacyCity.get("/pharmacy/:id",getPharmacyById)

export default PharmacyCity
