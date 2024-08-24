import Joi from "joi";

export const createPermissionDto = Joi.object().keys({
    fileId: Joi.string().required(),
    type: Joi.string().valid("user", "group", "domain", "anyone").required(),
    role: Joi.string().valid("owner", "organizer", "fileOrganizer", "writer", "reader").required(),
    emailAddress: Joi.string().optional()
});
