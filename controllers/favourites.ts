import { Router } from "express"
import { AuthtokenVerification } from "../middlewares/auth.middleware"
import { deleteFromFavMedicines, getFavouriteMedicines } from "../middlewares/favourites/favourite-medicines.middleware"

const FavouritesRouter = Router()


FavouritesRouter.get("/medicines/favourites",AuthtokenVerification,getFavouriteMedicines)
FavouritesRouter.delete("/medicines/favourites/:id",AuthtokenVerification,deleteFromFavMedicines)

export default FavouritesRouter
