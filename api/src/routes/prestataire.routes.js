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
 * @route GET api/prestataire
 * @desc affichage du tableau
 *    de prestataires valides
 */
router.get("/", verifyAdmin, verifySuperAdmin, getPrestataires);

/**
 * @route GET api/prestataire/pending
 * @desc afficher prestataires en attente
 *      de validation par superAdmin
 */
router.get("/pending", pendingPrestataires);

/**
 * @route POST api/prestataire/register
 * @desc enregistement prestataire valide
 */
router.post("/register", register);

/**
 * @route PUT api/prestataire/validate/:id
 * @desc maj pour valider un prestataire
 */
router.patch("/validate/:id", validatePrestataire);

/**
 * @route PUT api/prestataire/:id
 * @desc maj d'un prestataire
 */
router.put("/validate/:id", confirmPrestataire);

/**
 * @route DELETE api/prestataire/delete/:id
 * @desc suppression d'un prestataire
 */
router.delete("/delete/:id", verifySuperAdmin, deletePrestataire);

export { router as prestataireRoute };
