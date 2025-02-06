const { Schema, model } = require("mongoose");

const cleanerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  services: {
    type: String,
  },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
  },
});

module.exports = model("Cleaner", cleanerSchema);
