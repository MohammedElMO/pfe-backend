import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import db from "../prisma/client"
import { z } from "zod"
import bcrypt from "bcrypt"

export const getPofiler = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    // console.log(req.userData.userId)
    try {
      const userProfile = await db.user.findUnique({
        where: {
          id_utilisateur: req.userData.userId,
        },
        select: {
          username: true,
          prenom_utilisateur: true,
          nom_utilisateur: true,
          email_utilisateur: true,
        },
      })
      if (!userProfile) res.status(404).json("no user")

      res.status(200).json(userProfile)
    } catch (error) {
      res.status(500).json("err occured try again")
    }
  },
)

export const updateProfileInfo = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data

    try {
      const updateProfile = z.object({
        lastName: z.string().max(25),
        firstName: z.string().max(25),
        password: z.string().max(25),
        username: z.string().max(100),
        email: z.string().email().max(50),
      })
      if (!updateProfile.safeParse(req.body).success) {
        res.status(400).json("unvalid data provided")
        return
      }

      const isUpdated = await db.user.update({
        where: {
          id_utilisateur: req.userData.userId,
        },
        data: {
          email_utilisateur: req.body.email,
          nom_utilisateur: req.body.lastName,
          prenom_utilisateur: req.body.firstName,
          username: req.body.username,
        },
      })
      if (!isUpdated) res.status(500).json("failed to update")

      res.status(200).json("updated Successfully")
    } catch (error) {
      res.status(500).json("err occured try again")
    }
  },
)

export const deleteProfile = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    try {
      const isDeleted = await db.user.delete({
        where: {
          id_utilisateur: req.userData.userId,
        },
        include: {
          favoriser: true,
          Preferer: true,
        },
      })
      if (!isDeleted) {
        res.status(401).json("cannot delete profile")
      }

      res.status(200).json("profile deleted ")
    } catch (error) {
      res.status(500).json("err occured try again")
    }
  },
)

export const updatePassword = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    try {
      const changePasswordSchema = z.object({
        nouveauMotDePasse: z.string().max(25),
        currentPassword: z.string().max(25),
      })

      if (!changePasswordSchema.safeParse(req.body).success) {
        res.status(400).json("unvalid data provided")
        return
      }
      const user = await db.user.findUnique({
        where: {
          id_utilisateur: req.userData.userId,
        },
        select: {
          password_utilisateur: true,
        },
      })
      if (!user) {
        res.status(404).json("connot find user")
        return
      }
      const isCorrectPass = await bcrypt.compare(
        req.body.currentPassword,
        user.password_utilisateur,
      )

      if (isCorrectPass) {
        /// encrypt the password
        const hash = await bcrypt.hash(req.body.nouveauMotDePasse, 10)
        const updated = db.user.update({
          where: {
            id_utilisateur: req.userData.userId,
          },
          data: {
            password_utilisateur: hash,
          },
        })

        updated.catch(() => {
          res.status(500).json("failed to update password")
          return
        })
      } else {
        res.status(400).json("passwords are not the same")
      }

      res.status(200).json("password updated with success")
    } catch (error) {
      res.status(500).json("err occured try again")
      return
    }
  },
)
