const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  // test /test endpoint is working
  res.status(400).json({ message: "Plant Finder API is up and running!" });
});

module.exports = router;
