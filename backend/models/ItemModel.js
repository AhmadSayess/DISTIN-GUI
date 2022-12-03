const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    categorie: {
      type: Schema.Types.ObjectId,
      ref:"categorie",
      // required: true,
    },
  },
  {collection: 'items', timestamps: true }
);

const item = mongoose.model("items", itemSchema);
module.exports = item;
