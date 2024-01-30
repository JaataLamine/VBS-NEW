import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// 1. Recuperer le token enreg. dans le cookie
// 2. S'il n'existe pas renvoyer error
// 3. Sinon verifier si le token cree par le jwt
// 4. On l'enreg. dans l'objet user puis on va
//    dans la prochaine function
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Vous n'etes pas authentifie."));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Vous n'est pas authorise."));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (
      req.user.id === req.params.id ||
      req.user.isAdmin ||
      req.user.isSuperAdmin
    ) {
      next();
    } else {
      return next(errorHandler(403, "Vous n'etes pas autorise."));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin || req.uer.isSuperAdmin) {
      next();
    } else {
      return next(errorHandler(403, "Vous n'etes pas autorise."));
    }
  });
};

export const verifySuperAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isSuperAdmin) {
      next();
    } else {
      return next(errorHandler(403, "Vous n'etes pas autorise."));
    }
  });
};
