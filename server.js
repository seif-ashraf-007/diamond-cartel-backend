import express from "express";
import { PORT, NODE_ENV } from "./config/env.js";

const app = express();

app.listen(PORT, async() => {
	console.log(`[INFO] Server is running on port ${PORT} in ${NODE_ENV} mode`);
	console.log(`[INFO] API: http://localhost:${PORT}/`);
})