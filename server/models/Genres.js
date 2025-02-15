const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mangas: {
    type: Array,
    default: [],
  },
});

const Genre = mongoose.model("Genre", GenreSchema);

module.exports = Genre;
