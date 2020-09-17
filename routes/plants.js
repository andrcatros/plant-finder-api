const express = require("express");
const router = express.Router();

const PlantController = require("../controllers/plant");

// post operation is in the user routes file

router
  .get("/", PlantController.query)
  .get("/:plantId", PlantController.getById)
  .patch("/:plantId", PlantController.update)
  .delete("/:plantId", PlantController.delete);

module.exports = router;
