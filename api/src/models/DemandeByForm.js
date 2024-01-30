import mongoose from "mongoose";

const DemandeByFormSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
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

export const DemandeByForm = mongoose.model(
  "DemandeByForm",
  DemandeByFormSchema
);
