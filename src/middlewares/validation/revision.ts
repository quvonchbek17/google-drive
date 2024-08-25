import Joi from "joi";

export const getAllRevisonsDto = Joi.object().keys({
    fileId: Joi.string().required()
});


export const getRevisionById = Joi.object().keys({
    fileId: Joi.string().required(),
    revisionId: Joi.string().required(),
});

export const updateRevisionDto = Joi.object().keys({
    fileId: Joi.string().required(),
    revisionId: Joi.string().required(),
    publishAuto: Joi.boolean().optional(),
    published: Joi.boolean().optional(),
    publishedOutsideDomain: Joi.boolean().optional()
});

export const deleteRevisionDto = Joi.object().keys({
    fileId: Joi.string().required(),
    revisionId: Joi.string().required(),
});
