import User from "../model/User.js";
import sanitizeUser from "../utils/sanitizeUser.js";
import validateObjectId from "../utils/validateObjectId.js"

class UserService {
    static async getUsers() {
        const users = await User.find();

        return users.map((user) => sanitizeUser(user));
    }

    static async getUserById(id) {
        if (!validateObjectId(id)) {
            throw new Error("Invalid user ID");
        }

        const user = await User.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return sanitizeUser(user);
    }

    static async updateUser(id, data) {
        if (!validateObjectId(id)) {
            throw new Error("Invalid user ID");
        }

        const user = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return sanitizeUser(user);
    }

    static async deleteUser(id) {
        if (!validateObjectId(id)) {
            throw new Error("Invalid user ID");
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            throw new Error("User not found");
        }

        return true;
    }
}

export default UserService;