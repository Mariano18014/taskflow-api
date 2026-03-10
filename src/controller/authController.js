import AuthService from "../service/authService.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const result = await AuthService.register({ name, email, password });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await AuthService.login({ email, password });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const me = async (req, res, next) => {
    try {
        const user = await AuthService.me(req.user.id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};