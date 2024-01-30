import mongoose from "mongoose";

const DemandeSchema = new mongoose.Schema(
  {
    isValide: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    prestataireID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prestataire",
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const Demande = mongoose.model("Demande", DemandeSchema);
