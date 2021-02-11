const express = require("express");
const frequencyController = require("../controllers/frequencyController");

const router = express.Router();

router.route("/").get(frequencyController.getAllWords);

module.exports = router;
