import Joi from "joi";

export const watchChannelDto = Joi.object().keys({
    resourceId: Joi.string().required(),
    address: Joi.string().required(),
    type: Joi.any(),
    params: Joi.object({ttl: Joi.number().optional()}).optional()
});

export const stopChannelDto = Joi.object().keys({
    channelId: Joi.string().required(),
});
