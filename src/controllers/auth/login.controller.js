import { loginService } from "../../services/auth/login.service.js";

export const login = async (req, res, next) => {
 try {
	const userData = req.body;

	if (!userData || Object.keys(userData).length === 0) {
		return res.status(400).json({
			success: false,
			message: "No user data received. Please check your request"
		});
	}

	const result = await loginService(userData);

	res.status(200).json({
		data: result,
	});
	
 } catch (error) {
	next(error);
 }
}