import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";
import { errorHandler } from "../utils/error.js";

// Controller l'inscription
export const signup = async (req, res, next) => {
  // Recuperation des donnees soumises
  const { username, password, address, phone } = req.body;
  try {
    const user = await User.findOne({ username });
    // Verifier si le User existe
    if (user)
      return next(
        errorHandler(400, "Desole ce non d'utilisateur existe deja.")
      );
    // Sinon  hacher le password et creer le doc User
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      address,
      phone,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};

// Controller pour la connection
export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    // Si le user n'existe pas
    if (!user) return next(errorHandler(404, "Utilisateur introuvable."));
    // Sinon verifier si les password correspondent
    const isMatch = bcryptjs.compareSync(password, user.password);
    // Si le password est invalide
    if (!isMatch)
      return next(
        errorHandler(401, "Mot de passe ou nom d'utilisateur incorrectes.")
      );
    // const { password: pass, isAdmin, isSuperAdmin, ...rest } = user._doc;
    const { password: pass, ...rest } = user._doc;
    // Sinon creer un token jwt
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin },
      process.env.JWT_SECRET
    );
    // Et un cookie pour l'auth
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expire: process.env.EXPIRE,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Vous vous etes deconnecte");
  } catch (error) {
    next(error);
  }
};
