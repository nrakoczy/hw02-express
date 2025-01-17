const Joi = require("joi");


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contacts = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true, }
);

const Contact = mongoose.model("contact", contacts);


const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = {

  Contact,

  contactSchema,
};