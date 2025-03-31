import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt.util.js";

export const loginService = async ({email, password}) => {
	try {
		if (!email || !password) {
			throw new Error("All fields are required");
		}

		const user = await User.findOne({email});

		if (!user) {
			throw new Error("Invalid credentials");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error("Invalid credentials");
		}

		const token = generateToken(user._id);

		return {
			token,
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phoneNumber: user.phoneNumber,
			}
		}
	} catch (error) {
		throw new Error(error.message);
	}
}