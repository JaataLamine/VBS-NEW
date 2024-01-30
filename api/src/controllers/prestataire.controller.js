import { Prestataire } from "../models/Prestataire.js";
import { errorHandler } from "../utils/error.js";

// Controller pour afficher tous les prestataires
export const getPrestataires = async (req, res, next) => {
  try {
    // Recuperation des prestataires enregistres
    const validPrestataires = await Prestataire.find({ isValid: true });
    res.status(200).json(validPrestataires);
  } catch (error) {
    next(error);
  }
};

// Controller pour afficher les prestataires en cours de validation
export const pendingPrestataires = async (req, res, next) => {
  try {
    // Recuperation prestataires en attente de validation
    const prestatairePending = await Prestataire.find({ isValid: false });
    res.status(200).json(prestatairePending);
  } catch (error) {
    next(error);
  }
};

// Controller pour enregistrer un prestataire
export const register = async (req, res, next) => {
  const { name, address, phone, serviceName } = req.body;
  try {
    if (!name || !address || !phone || !serviceName)
      next(errorHandler(400, "Desole vous devez renseigner tous les champs!"));

    const prestataire = await Prestataire.findOne({
      name,
      address,
      phone,
      serviceName,
    });
    // Verifier si le prestataire existe
    if (prestataire)
      return next(errorHandler(400, "Desole ce prestataire existe deja."));
    // Sinon creer le prestataire
    const newPrestataire = new Prestataire({
      name,
      address,
      phone,
      serviceName,
    });
    const PendingPrestataire = await newPrestataire.save();
    res.json(PendingPrestataire);
  } catch (error) {
    next(error);
  }
};

// Controller pour valider un prestataire by id
export const validatePrestataire = async (req, res, next) => {
  try {
    const validPrestataire = await Prestataire.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isValid: req.body.isValid },
      },
      { new: true }
    );
    res.status(200).json(validPrestataire);
  } catch (error) {
    next(error);
  }
};

// Controller pour confirmer un prestataire by id
export const confirmPrestataire = async (req, res, next) => {
  try {
    const validPrestataire = await Prestataire.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isValid: req.body.isValid },
      },
      { new: true }
    );
    res.status(200).json(validPrestataire);
  } catch (error) {
    next(error);
  }
};

// Controller pour supprimer un prestataire by id
export const deletePrestataire = async (req, res, next) => {
  try {
    await Prestataire.findByIdAndDelete(req.params.id);
    res.status(200).json("Prestataire supprime.");
  } catch (error) {
    next(error);
  }
};
