import { registerService } from "../../services/auth/register.service.js";

export const register = async (req, res, next) => {
	try {
		const userData = req.body;
		
		if (!userData || Object.keys(userData).length === 0) {
			return res.status(400).json({
				success: false,
				message: "No user data received. Please check your request"
			});
		}
		
		const result = await registerService(userData);

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: result,
		});
	} catch (error) {
		next(error);
	}
}