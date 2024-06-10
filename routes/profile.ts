import { Router } from "express";
import { AuthtokenVerification } from "../controllers/auth.middleware";
import {
  deleteProfile,
  getPofiler,
  updatePassword,
  updateProfileInfo,
} from "../controllers/profile.middleware";

const ProfileRouter = Router();

ProfileRouter.get("/profile", AuthtokenVerification, getPofiler);
ProfileRouter.post("/profile-info", AuthtokenVerification, updateProfileInfo);
ProfileRouter.delete("/delete-profile", AuthtokenVerification, deleteProfile);
ProfileRouter.put(
  "/change-profile-pass",
  AuthtokenVerification,
  updatePassword
);

export default ProfileRouter;
