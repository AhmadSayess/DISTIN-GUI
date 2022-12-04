const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: Array,
      required: true,
    },
  },
  {collection: 'categories', timestamps: true }
);

const categorie = mongoose.model("categorie", categorieSchema);
module.exports = categorie;
