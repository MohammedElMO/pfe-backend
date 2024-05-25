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
        res.status(404).json("no medicines found in fav")
        return
      }
      res.json(medicines)
    } catch (error) {
      res.status(500).json("err occured")
    }
  },
)

export const getFavouriteMedicinesIds = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    try {
      const PreferId = await db.prefer.findMany({
        select: {
          id_medicament: true,
        },
      })
      if (!PreferId) {
        res.status(404).json("error happend")
        return
      }
      res.json(PreferId)
    } catch (error) {
      res.status(500).json("err occured")
    }
  },
)

export const deleteFromFavMedicines = asyncHandler(
  async (req: Request & any, res: Response) => {
    try {
      console.log("id ", req.params.id)
      const deletedMedicine = await db.prefer.delete({
        where: {
          id_medicament_id_utilisateur: {
            id_medicament: +req.params.id,
            id_utilisateur: req.userData.userId,
          },
        },
      })
      if (!deletedMedicine) {
        res.status(404).json("no medicines found to delete")
        return
      }
      res.status(200).json("deleted fav with success")
    } catch (error) {
      console.log(error)
      res.status(500).json("err occured")
    }
  },
)

export const getFavouritePharmacies = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    try {
      const pharmacies = await db.user.findUnique({
        where: {
          id_utilisateur: req.userData.userId,
        },
        select: {
          favoriser: {
            include: {
              pharmacie: true,
            },
          },
        },
      })

      if (!pharmacies) {
        res.status(404).json("no pharmacies found in fav")
        return
      }
      res.send(pharmacies)
    } catch (error) {
      res.status(500).json("err occured")
    }
  },
)

export const deleteFromFavParmacies = asyncHandler(
  async (req: Request & any, res: Response) => {
    try {
      const deletedPhars = await db.favored.delete({
        where: {
          id_pharmacie_id_utilisateur: {
            id_pharmacie: +req.params.id,
            id_utilisateur: req.userData.userId,
          },
        },
      })
      console.log(deletedPhars)
      if (!deletedPhars) {
        res.status(404).json("no medicines found to delete")
        return
      }
      res.json("deleted fav with success").status(200)
    } catch (error) {
      console.log(error)
      res.status(500).json("err occured")
    }
  },
)

export const CreateFavouritePharmacy = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    try {
      await db.favored.create({
        data: {
          id_utilisateur: req.userData.userId,
          id_pharmacie: req.body.pharmacieId,
        },
      })

      res.json({ success: "success" }).status(201)
    } catch (error) {
      res.json("err occured").status(500)
    }
  },
)

export const CreateFavouriteMedicines = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    try {
      await db.prefer.create({
        data: {
          id_utilisateur: req.userData.userId,
          id_medicament: req.body.medicineId,
        },
      })

      res.json({ success: "success" }).status(201)
    } catch (error) {
      res.json("err occured").status(500)
    }
  },
)
