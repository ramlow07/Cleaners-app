const { Schema, model } = require("mongoose");

const cleanerSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  services: {
    type: [String],
  },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
  },
});

module.exports = model("Cleaner", cleanerSchema);
