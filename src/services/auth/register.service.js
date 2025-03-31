import User from '../../models/user.model.js';
import bcrypt from 'bcryptjs';

export const registerService = async ({firstName, lastName, email, phoneNumber, password}) => {
	try {
		if (!firstName || !lastName || !email || !phoneNumber || !password) {
			throw new Error("All fields are required");
		}
	
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error("User already exists");
		}
	
		const hashedPassword = await bcrypt.hash(password, 10);
	
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			phoneNumber,
			password: hashedPassword,
		});
		return {user: newUser};
	} catch (error) {
		throw new Error(error.message);
	}
}