const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Sentence = require("../../models/sentencemodel");
const { _ } = require("core-js");

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

//This connects express to mongodb
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("DB connection successful");
	});

//READ FILE
const sentences = JSON.parse(
	fs.readFileSync(`${__dirname}/test db.json`, "utf-8")
);

numberify = () => {
	sentences.viva1.forEach((el) => {
		el.level = el.level * 1;
		el.vivaRef = el.vivaRef * 1;
	});
};

numberify();

const arrayify = () => {
	sentences.viva1.forEach((el) => {
		el.grammar = el.grammar.split(",");
	});
};

arrayify();

const importData = async () => {
	try {
		await Sentence.create(sentences.viva1);
		console.log("fine, imported");
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

const deleteData = async () => {
	try {
		await Sentence.deleteMany();
		console.log("fine, deleted");
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

// const delayedFunction = () => setTimeout(importData, 10000);
// delayedFunction();

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}
