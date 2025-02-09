import { Schema, model, Document } from "mongoose";

interface ICleaner extends Document {
  name: string;
  price: number;
  location?: string;
  description: string;
  services?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
}

const cleanerSchema = new Schema<ICleaner>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String },
  description: { type: String, required: true },
  services: { type: String },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
  },
});

export default model<ICleaner>("Cleaner", cleanerSchema);
