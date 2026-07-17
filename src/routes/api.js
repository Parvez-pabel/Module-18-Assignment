import express from "express";
import {
  allUsers,
  updatedUserInfo,
  userDelete,
  userGetById,
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, userProfile);
router.get("/users", protect, allUsers);
router.get("/users/:id", protect, userGetById);
router.put("/users/:id", protect, updatedUserInfo);
router.delete("/users/:id", protect, userDelete);

export default router;
