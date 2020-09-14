var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.status(400).json({ message: "Plant Finder API is up and running!" });
});

module.exports = router;
