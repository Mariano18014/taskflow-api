import UserService from "../service/userService.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await UserService.getUsers();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await UserService.getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedUser = await UserService.updateUser(id, req.body);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        await UserService.deleteUser(id);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};