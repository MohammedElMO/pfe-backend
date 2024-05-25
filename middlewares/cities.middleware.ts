import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import db from "../prisma/client"

export const getAllCities = asyncHandler(
  async (req: Request & any, res: Response) => {
    try {
      const pharmacies = await db.pharamcy.findMany()
      const favoredIds = await db.favored.findMany({
        select: {
          id_pharmacie: true,
        },
      })

      // Transform data into the desired structure
      const groupedPharmacies = pharmacies.reduce<any>((acc, pharmacy) => {
        const {
          id_pharmacie,
          nom_pharmacie,
          lat_pharmacie,
          lot_pharmacie,
          adresse_pharmacie,
          fix_pharmacie,
          Heure_ouverture,
          Heure_fermeture,
          ville_pharmacie,
        } = pharmacy

        if (!acc[ville_pharmacie]) {
          acc[ville_pharmacie] = {}
        }

        const pharmacyKey = `pharmacy_${id_pharmacie}`
        acc[ville_pharmacie][pharmacyKey] = {
          id: id_pharmacie,
          name: nom_pharmacie,
          lat: lat_pharmacie,
          long: lot_pharmacie,
          add: adresse_pharmacie,
          phone: fix_pharmacie,
          heure_overtuer: Heure_ouverture.toISOString().substring(11, 16), // Extracting time part
          heure_fermeture: Heure_fermeture.toISOString().substring(11, 16), // Extracting time part
        }

        return acc
      }, {})

      if (!pharmacies) res.status(404).json("no cities")
      res.status(200).json({ groupedPharmacies, favoredIds })
    } catch (error) {
      res.status(500).json("err occured try again")
    }
  },
)

export const getPharmacyById = asyncHandler(
  async (req: Request & any, res: Response) => {
    try {
      const pharmacy = await db.pharamcy.findUnique({
        where: {
          id_pharmacie: +req.params.id,
        },
        include: {
          Contain: {
            select: {
              medicament: true,
            },
          },
        },
      })

      if (!pharmacy) res.status(404).json("no cities")
      res.status(200).json(pharmacy)
    } catch (error) {
      res.status(500).json("err occured try again")
    }
  },
)

