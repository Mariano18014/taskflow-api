import Joi from 'joi';

export const createProjectSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .max(500)
        .allow("")
        .optional()
});

export const updateProjectSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .optional(),

    description: Joi.string()
        .max(500)
        .allow("")
        .optional()
});