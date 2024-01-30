import { Demande } from "../models/Demande.js";
import { DemandeByForm } from "../models/DemandeByForm.js";
import { errorHandler } from "../utils/error.js";

// Controller pour faire une demande
export const faireDemande = async (req, res, next) => {
  const { serviceID, serviceName } = req.body;
  const newDemande = new Demande(req.body);
  try {
    const savedDemande = await newDemande.save();
    res.status(200).json(savedDemande);
  } catch (error) {
    next(errorHandler(500, "Impossible de faire la demande."));
  }
};

// Controller pour faire une demande by form
export const faireDemandeByForm = async (req, res, next) => {
  try {
    const { serviceName, username, address, phone, isComplete } = req.body;
    if (!serviceName || !username || !address || !phone)
      next(errorHandler(400, "Desole vous devez renseigner tous les champs!"));

    const demandeByForm = await DemandeByForm.findOne({
      serviceName,
      username,
      address,
      phone,
      isComplete,
    });

    if (demandeByForm) return next(errorHandler(404, "Demande deja effectuee"));

    const newDemande = new Demande({
      serviceName,
      username,
      address,
      phone,
    });
    const savedDemande = await newDemande.save();
    res.json(savedDemande);
  } catch (error) {
    next(error);
  }
};

// Controller pour afficher toutes les demandes
export const getDemandes = async (req, res, next) => {
  try {
    // Recuperation des demandes
    const demandes = await Demande.find();
    res.status(200).json(demandes);
  } catch (error) {
    next(error);
  }
};

// Controller pour afficher une demande by id
export const getDemande = async (req, res, next) => {
  try {
    const demande = await Demande.findOne(req.params.id);
    res.status(200).json(demande);
  } catch (error) {
    next(error);
  }
};

// Controller pour maj une demande
export const updateDemande = async (req, res, next) => {
  try {
    const updatedDemande = await Demande.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDemande);
  } catch (error) {
    next(error);
  }
};

// Controller pour supprimer une demande
export const deleteDemande = async (req, res, next) => {
  try {
    await Demande.findByIdAndDelete(req.params.id);
    res.status(200).json("La demande a ete supprimee.");
  } catch (error) {
    next(errorHandler(500, "Impossible de modifier la demande."));
  }
};
