import User from "../model/User.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import { comparePassword } from "../utils/comparePassword.js";


class AuthService {
    static async register({ name, email, password }) {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        return {
            user,
            token,
        };
    }

    static async login({ email, password }) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = generateToken(user._id);

        return {
            user,
            token,
        };
    }

    static async me(userId) {
        const user = await User.findById(userId).select("-password");

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}

export default AuthService;