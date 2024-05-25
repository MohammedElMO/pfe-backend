import { Router } from "express"
import { AuthtokenVerification } from "../middlewares/auth.middleware"
import { CreateFavouriteMedicines, CreateFavouritePharmacy, deleteFromFavMedicines, deleteFromFavParmacies, getFavouriteMedicines, getFavouriteMedicinesIds, getFavouritePharmacies } from "../middlewares/favourites/favourite-medicines.middleware"

const FavouritesRouter = Router()

FavouritesRouter.post("/pharmacies/favourites",AuthtokenVerification,CreateFavouritePharmacy)
FavouritesRouter.post("/medicines/favourites",AuthtokenVerification,CreateFavouriteMedicines)

FavouritesRouter.get("/medicines/favourites",AuthtokenVerification,getFavouriteMedicines)
FavouritesRouter.delete("/medicines/favourites/:id",AuthtokenVerification,deleteFromFavMedicines)


FavouritesRouter.get("/pharmacies/favourites",AuthtokenVerification,getFavouritePharmacies)
FavouritesRouter.delete("/pharmacies/favourites/:id",AuthtokenVerification,deleteFromFavParmacies)




FavouritesRouter.get("/medicines/favourites/ids",AuthtokenVerification,getFavouriteMedicinesIds)

export default FavouritesRouter
