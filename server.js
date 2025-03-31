import express from "express";
import { PORT, NODE_ENV } from "./config/env.js";
import connectToDatabase from "./src/database/mongodb.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

app.use("/api/v1/auth", authRouter);

app.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "Welcome to the API",
	})
})

app.listen(PORT, async() => {
	console.log(`[INFO] Server is running on port ${PORT} in ${NODE_ENV} mode`);
	console.log(`[INFO] API: http://localhost:${PORT}/`);

	await connectToDatabase();
})