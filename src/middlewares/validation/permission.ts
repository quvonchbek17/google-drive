import Joi from "joi";

export const getAllPermissionsDto = Joi.object().keys({
    fileId: Joi.string().required()
});

export const getPermissionByIdDto = Joi.object().keys({
    fileId: Joi.string().required(),
    permissionId: Joi.string().required(),
});

export const createPermissionDto = Joi.object().keys({
    fileId: Joi.string().required(),
    type: Joi.string().valid("user", "group", "domain", "anyone").required(),
    role: Joi.string().valid("owner", "organizer", "fileOrganizer", "writer", "reader").required(),
    emailAddress: Joi.string().optional(),
    expirationTime: Joi.string().optional()
});

export const updatePermissionDto = Joi.object().keys({
    fileId: Joi.string().required(),
    permissionId: Joi.string().required(),
    role: Joi.string().valid("owner", "organizer", "fileOrganizer", "writer", "reader").optional()
});

export const deletePermissionDto = Joi.object().keys({
    fileId: Joi.string().required(),
    permissionId: Joi.string().required()
});
