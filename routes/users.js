const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

/* GET users listing. */
router
  .post("/", UserController.create)
  .get("/", UserController.query)
  .get("/:id", UserController.getById)
  .patch("/:id", UserController.update)
  .delete("/:id", UserController.delete);

module.exports = router;
