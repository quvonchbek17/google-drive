import Joi from "joi";

export const getAppById = Joi.object().keys({
    appId: Joi.string().required()
});
