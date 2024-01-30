import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import {
  verifyAdmin,
  verifySuperAdmin,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken.js";

const router = Router();

/**
 * @route GET api/user
 * @desc afficher les users
 * @access Public
 */
router.get("/", verifyAdmin, verifySuperAdmin, getUsers);

/**
 * @route GET api/user/:id
 * @desc afficher user by id
 * @access Public
 */
router.get("/:id", verifyUser, getUser);

/**
 * @route PUT api/user/:id
 * @description maj un user by id
 * @access Public
 */
router.put("/update/:id", verifyUser, updateUser);

/**
 * @route DELETE api/user/:id
 * @desc delete un user by id
 * @access Public
 */
router.delete("/delete/:id", verifyUser, deleteUser);

export { router as userRoute };
