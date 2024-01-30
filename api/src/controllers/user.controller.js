import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";

// Controller pour afficher tous les users
export const getUsers = async (req, res, next) => {
  try {
    // Recuperation des users
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Controller pour afficher un user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById({ id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Controller pour la maj de user
export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          address: req.body.address,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    // Separer le password du reste
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Controller pour supprimer un user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Utilisateur supprime!");
  } catch (error) {
    next(error);
  }
};
