const Frequency = require("../models/frequencymodel");

//Unfinished

exports.getAllWords = async (req, res) => {
	try {
		const words = await Frequency.find();
		res.status(200).json({
			status: "success",
			data: {
				words,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		});
		console.log(err);
	}
};
