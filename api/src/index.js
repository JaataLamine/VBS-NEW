import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Import des Routes
import { userRoute } from "./routes/user.routes.js";
import { prestataireRoute } from "./routes/prestataire.routes.js";
import { serviceRoute } from "./routes/service.routes.js";
import { demandeRoute } from "./routes/demande.routes.js";
import { authRoute } from "./routes/auth.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Do not identify Express
app.disable("x-powered-by");

// Convertir les donnees en json
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Connection to MongoDB database
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongoDB.");
  } catch (err) {
    console.error(err.message);
  }
};
dbConnection();

// Middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/service", serviceRoute);
app.use("/api/demande", demandeRoute);
app.use("/api/prestataire", prestataireRoute);

// Middlewares to handle the errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur sur le serveur interne.";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () =>
  console.log(`Server stated at http://localhost:${port}`)
);
