import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import db from "../prisma/client"

export const getPofiler = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    const userProfile = await db.user.findUnique({
      where: {
        id_utilisateur: req.userData.userId,
      },
      select: {
        uesrname: true,
        prenom_utilisateur: true,
        nom_utilisateur: true,
        email_utilisateur: true,
      },
    })
    if (!userProfile) res.status(401).json("no user")

    res.json(userProfile).status(200)
  },
)
export const updateProfileInfo = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
    console.log(req.userData)
    const isUpdated = await db.user.update({
      where: {
        id_utilisateur: req.userData.userId,
      },
      data: {
        email_utilisateur: req.body.email,
        nom_utilisateur: req.body.lastName,
        prenom_utilisateur: req.body.firstName,
        uesrname: req.body.username,
      },
    })
    if (!isUpdated) res.status(500).json("failed to update")

    res.status(200).json("updated Successfully")
  },
)

export const deleteProfile = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data
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
      res.json("cannot delete profile").status(401)
    }

    res.json("profile deleted ").status(200)
  },
)
// currentPassword: string;
//     confirmePassword: string;
//     nouveauMotDePasse: string;
export const updatePassword = asyncHandler(
  async (req: Request & any, res: Response) => {
    // req.userData -- data

    const user = await db.user.findUnique({
      where: {
        id_utilisateur: req.userData.userId,
      },
      select: {
        password_utilisateur: true,
      },
    })
    console.log(user)
    if (!user) {
      res.json("connot find user").status(404)
      return
    }

    if (user.password_utilisateur === req.body.currentPassword) {
      const updated = await db.user.update({
        where: {
          id_utilisateur: req.userData.userId,
        },
        data: {
          password_utilisateur: req.body.nouveauMotDePasse,
        },
      })
      if (!updated) {
        res.json("failed to update password").status(500)
        return
      }
    }else {
      res.json("pass are not the same").status(400)

    }

    res.json("password updated with success").status(200)
  },
)
