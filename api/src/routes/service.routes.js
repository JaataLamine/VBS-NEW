import { Router } from "express";
import {
  getService,
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { verifySuperAdmin } from "../utils/verifyToken.js";

const router = Router();

/**
 * @route GET api/service
 * @desc affiche services
 * @access Public
 */
router.get("/", getServices);

/**
 * @route GEt api/service/:id
 * @desc affiche un service by id
 * @access Public
 */
router.get("/:id", getService);

/**
 * @route POST api/service
 * @desc ajouter service
 * @access Public
 */
router.post("/create", verifySuperAdmin, createService);

/**
 * @route PUT api/service/:id
 * @desc maj service by id
 * @access Public
 */
router.put("/:id", verifySuperAdmin, updateService);

/**
 * @route DELETE api/service/:id
 * @desc delete service by id
 * @access Public
 */
router.delete("/:id", verifySuperAdmin, deleteService);

export { router as serviceRoute };
