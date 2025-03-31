import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../../config/env.js";

if (!DB_URI) {
	throw new Error("Please define the DB_URI environment variable inside .env.local file");
}

const connectToDatabase = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log(`[INFO] Connected to the database: ${mongoose.connection.name} in ${NODE_ENV} mode`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

export default connectToDatabase;