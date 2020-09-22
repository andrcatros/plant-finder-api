const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const PlantController = require("../controllers/plant");
const imageUpload = require("../middleware/imageUpload");

router
  .post("/", UserController.create)
  .get("/", UserController.query)
  .get("/:id", UserController.getById)
  .patch("/:id", UserController.update)
  .delete("/:id", UserController.delete)
  //login route
  .post("/login", UserController.login)
  // routes to access a user's plants
  .post("/:userId/plants", upload("img"), PlantController.create)
  .get("/:userId/plants", PlantController.getUserPlants);

module.exports = router;
