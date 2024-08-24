import Joi from "joi";

export const getAllCommentsDto = Joi.object().keys({
    fileId: Joi.string().required()
});

export const getCommentByIdDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required()
});

export const createCommentDto = Joi.object().keys({
    fileId: Joi.string().required(),
    content: Joi.string().required()
});

export const updateCommentDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required(),
    content: Joi.string().required()
});

export const deleteCommentDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required()
});

export const replyToCommentDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required(),
    content: Joi.string().required()
});