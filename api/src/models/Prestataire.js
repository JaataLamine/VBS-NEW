import mongoose from "mongoose";

const PrestataireSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    serviceName: {
      type: mongoose.Schema.Types.String,
      ref: "Service",
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAvalaible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

export const Prestataire = mongoose.model("Prestataire", PrestataireSchema);
