import { Router } from "express";
import {
  getAllCities,
  getFavouriteIds,
  getPharmacyById,
} from "../controllers/cities.middleware";
import { AuthtokenVerification } from "../controllers/auth.middleware";

const PharmacyCity = Router();

PharmacyCity.get("/pharmacy/cities", getAllCities);
PharmacyCity.get(
  "/pharmacy/favouritesIds",
  AuthtokenVerification,
  getFavouriteIds
);
PharmacyCity.get("/pharmacy/:id", getPharmacyById);

export default PharmacyCity;
