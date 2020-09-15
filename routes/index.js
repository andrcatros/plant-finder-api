const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");
const PlantModel = require("../models/plant");

router
  .get("/", (req, res, next) => {
    // test /test endpoint is working
    res.status(400).json({ message: "Plant Finder API is up and running!" });
  })
  .post("/", (req, res) => {
    // test Users are posting to the database
    UserModel.create(req.body).then((user) => res.status(201).json(user));
  })
  .post("/:id/plant", (req, res) => {
    // test Plants are posting to the database
    const userId = req.params.id;

    PlantModel.create({ ...req.body, User: userId }).then((plant) =>
      res.status(201).json(plant)
    );
  })
  .get("/allplants", (req, res) => {
    // test Plants are posting to the database with corrent User
    PlantModel.find({})
      .populate("User")
      .then((plants) => res.status(200).json(plants));
  });

module.exports = router;
