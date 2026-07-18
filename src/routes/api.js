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

router.post("/students", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, userProfile);
router.get("/students", protect, allUsers);
router.get("/students/:id", protect, userGetById);
router.put("/students/:id", protect, updatedUserInfo);
router.delete("/students/:id", protect, userDelete);

export default router;
