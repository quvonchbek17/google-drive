import Joi from "joi";

export const getDriveByIdDto = Joi.object().keys({
    driveId: Joi.string().required()
});

export const createDriveDto = Joi.object().keys({
    name: Joi.string().required(),
    backgroundImageFileId: Joi.string().optional()
});

export const updateDriveDto = Joi.object().keys({
    driveId: Joi.string().required(),
    name: Joi.string().optional(),
    backgroundImageFileId: Joi.string().optional()
});

export const deleteDriveDto = Joi.object().keys({
    driveId: Joi.string().required()
});

export const hideDriveDto = Joi.object().keys({
    driveId: Joi.string().required()
});

export const unHideDriveDto = Joi.object().keys({
    driveId: Joi.string().required()
});
