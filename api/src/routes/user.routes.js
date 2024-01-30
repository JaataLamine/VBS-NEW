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
 * @route GET api/user/checkauthentication
 * @desc verifie si token user est valid
 * @access Public
 */

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin, you are logged in and you can delete all accounts");
// });

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
