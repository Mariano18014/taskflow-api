import Joi from "joi";

export const updateUserSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .optional(),

    email: Joi.string()
        .email()
        .optional(),

    password: Joi.string()
        .min(6)
        .max(50)
        .optional(),

    role_global: Joi.string()
        .valid("admin", "user")
        .optional()
});