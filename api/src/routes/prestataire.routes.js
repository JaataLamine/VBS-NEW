import { Router } from "express";
import {
  deletePrestataire,
  getPrestataires,
  pendingPrestataires,
  register,
  validatePrestataire,
  confirmPrestataire,
} from "../controllers/prestataire.controller.js";
import { verifyAdmin, verifySuperAdmin } from "../utils/verifyToken.js";

const router = Router();

/**
 * @route GET api/prestataires
 * @desc affichage du tableau
 *           de prestataires
 */
router.get("/", verifyAdmin, verifySuperAdmin, getPrestataires);

/**
 * @route GET api/prestataires/register
 * @desc afficher prestataires en attente
 *      de validation par superAdmin
 */
router.get("/pending", pendingPrestataires);

/**
 * @route POST api/prestataires/register
 * @desc enregistement prestataire valide
 */
router.post("/register", register);

/**
 * @route PUT api/prestataires/:id
 * @desc maj d'un prestataire
 */
router.patch("/validate/:id", validatePrestataire);

/**
 * @route PUT api/prestataires/:id
 * @desc maj d'un prestataire
 */
router.put("/validate/:id", confirmPrestataire);

/**
 * @route DELETE api/prestataires/:id
 * @desc suppression d'un prestataire
 */
router.delete("/:id", verifySuperAdmin, deletePrestataire);

export { router as prestataireRoute };
