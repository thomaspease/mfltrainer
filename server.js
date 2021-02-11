const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Catches all uncaught errors
process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN...");
	console.log(err);
	process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

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
	})
	.catch((err) => {
		console.log(`DB Connection Error: ${err.message}`);
	});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

// Catches uncaught rejected promises
process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! 💥 SHUTTING DOWN...");
	console.log(err);
	server.close(() => {
		process.exit(1);
	});
});
