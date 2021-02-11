const mongoose = require("mongoose");

const frequencySchema = mongoose.Schema({
	word: String,
	freq: Number,
});

const Frequency = mongoose.model("Frequency", frequencySchema, "frequency");

module.exports = Frequency;
