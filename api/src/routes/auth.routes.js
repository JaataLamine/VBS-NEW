import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @route POST api/auth/signup
 * @desc inscrire un user
 * @access Public
 */
router.post("/signup", signup);
/**
 * @route POST api/auth/signin
 * @desc connecter un user
 * @access Public
 */
router.post("/signin", signin);

/**
 * @route POST api/clients/signout
 * @desc deconnecter un user
 * @access Public
 */
router.get("/signout", signout);

export { router as authRoute };
