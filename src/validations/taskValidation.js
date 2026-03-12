import Joi from 'joi';

export const createTaskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(150)
        .required(),

    description: Joi.string()
        .max(1000)
        .allow("")
        .optional(),

    status: Joi.string()
        .valid("pending", "in_progress", "completed")
        .optional(),

    priority: Joi.string()
        .valid("low", "medium", "high")
        .optional(),

    dueDate: Joi.date()
        .optional(),

    assignedTo: Joi.string()
        .optional()
});

export const updateTaskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(150)
        .optional(),

    description: Joi.string()
        .max(1000)
        .allow("")
        .optional(),

    priority: Joi.string()
        .valid("low", "medium", "high")
        .optional(),

    dueDate: Joi.date()
        .optional(),

    assignedTo: Joi.string()
        .optional()
});

export const updateTaskStatusSchema = Joi.object({
    status: Joi.string()
        .valid("pending", "in_progress", "completed")
        .required()
});