import { Router } from "express"
import {
  getAllCities,
  getFavouriteIds,
  getPharmacyById,
} from "../middlewares/cities.middleware"
import { AuthtokenVerification } from "../middlewares/auth.middleware"

const PharmacyCity = Router()

PharmacyCity.get("/pharmacy/cities", getAllCities)
PharmacyCity.get("/pharmacy/favouritesIds", AuthtokenVerification, getFavouriteIds)
PharmacyCity.get("/pharmacy/:id", getPharmacyById)

export default PharmacyCity
