const { Storage } = require("@google-cloud/storage");

const PlantModel = require("../models/plant");

// initialise google cloud storage
const storage = new Storage();

const bucket = storage.bucket("gs://plant-finder-image-upload.appspot.com/");

exports.create = (req, res) => {
  const userId = req.params.userId;
  let img;

  if (!req.file) {
    img = "default";
  } else {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.end(req.file.buffer);

    img = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  }

  PlantModel.create({ ...req.body, img: img, User: userId })
    .then((plant) => res.status(201).json(plant))
    .catch((err) => res.status(400).json(err));
};

// query all plant database
exports.query = (req, res) => {
  let query = req.body.query;

  req.body.query ? (query = req.body.query) : (query = {});

  PlantModel.find(query)
    .populate("User")
    .then((plants) => res.status(200).json(plants))
    .catch((err) => res.status(400).json(err));
};

exports.getUserPlants = (req, res) => {
  const userId = req.params.userId;

  PlantModel.find({ User: userId })
    .populate("User")
    .then((plants) => res.status(200).json(plants))
    .catch((err) => res.status(400).json(err));
};

exports.getById = (req, res) => {
  const plantId = req.params.plantId;

  PlantModel.findById(plantId)
    .then((plant) => res.status(200).json(plant))
    .catch((err) => res.status(404).json({ error: "Plant not found." }));
};

exports.update = (req, res) => {
  const plantId = req.params.plantId;

  PlantModel.findByIdAndUpdate(plantId, req.body, {
    new: true,
  })
    .then((updated) => res.status(200).json(updated))
    .catch((err) => res.status(400).json(err));
};

exports.delete = (req, res) => {
  const plantId = req.params.plantId;

  PlantModel.findByIdAndRemove(plantId)
    .then((removed) => res.status(200).json(removed))
    .catch((err) => res.status(400).json(err));
};
