import { Service } from "../models/Service.js";

// Controller pour afficher tous les services
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

// Controller pour afficher un service by id
export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

// Controller pour creer un service
export const createService = async (req, res, next) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(200).json(savedService);
  } catch (error) {
    next(errorHandler(500, "Impossible d'enregistrer le service"));
  }
};

// Controller pour maj un service by id
export const updateService = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};

// Controller pour supprimer un service by id
export const deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json("Service supprime.");
  } catch (error) {
    next(error);
  }
};
