import Joi from "joi";

export const addProjectMemberSchema = Joi.object({
    userId: Joi.string()
        .required(),

    role: Joi.string()
        .valid("owner", "admin", "member")
        .required()
});

export const updateProjectMemberRoleSchema = Joi.object({
    role: Joi.string()
        .valid("owner", "admin", "member")
        .required()
});