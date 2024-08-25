import Joi from "joi";

export const getAllChanges = Joi.object().keys({
    pageToken: Joi.string().required(),
    pageSize: Joi.string().optional()
});
