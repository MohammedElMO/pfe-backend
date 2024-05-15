import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import db from "../../prisma/client"

export const getFavouriteMedicines = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    try {
      const medicines = await db.user.findUnique({
        where: {
          id_utilisateur: req.userData.userId,
        },

        select: {
          Preferer: {
            select: {
              medicament: {
                include: {
                  Contain: {
                    select: {
                      quantite: true,
                      pharmacie: {
                        select: {
                          adresse_email: true,
                          fix_pharmacie: true,
                          Heure_fermeture: true,
                          Heure_ouverture: true,
                          nom_pharmacie: true,
                          adresse_pharmacie: true,
                          ville_pharmacie: true,
                          lat_pharmacie: true,
                          lot_pharmacie: true,
                        },
                      },
                    },
                  },
                },
              },
              date_preferation: true,
            },
          },
        },
      })
      if (!medicines) {
        res.json("no medicines found in fav").status(404)
        return
      }
      res.send(medicines)
    } catch (error) {
      res.json("err occured").status(500)
    }
  },
)

export const deleteFromFavMedicines = asyncHandler(
  async (req: Request & any, res: Response) => {
    try {
      const deletedMedicine = await db.prefer.delete({
        where: {
          id_medicament_id_utilisateur: {
            id_medicament: +req.params.id,
            id_utilisateur: req.userData.userId,
          },
        },
      })
      if (!deletedMedicine) {
        res.json("no medicines found to delete").status(404)
        return
      }
      res.json("deleted fav with success").status(200)
    } catch (error) {
      console.log(error)
      res.json("err occured").status(500)
    }
  },
)
