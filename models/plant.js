const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  img: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: Array, require: true },
  User: { type: Schema.Types.ObjectId, ref: "User", require: true },
});

const PlantModel = mongoose.model("Plant", PlantSchema);

module.exports = PlantModel;
