import Joi from "joi";

export const getAllRepliesDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required(),
});

export const getReplyByIdDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required(),
    replyId: Joi.string().required(),
});

export const createReplyToCommentDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required(),
    content: Joi.string().required()
});

export const updateReplyDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required(),
    replyId: Joi.string().required(),
    content: Joi.string().required()
});

export const deleteReplyDto = Joi.object().keys({
    fileId: Joi.string().required(),
    commentId: Joi.string().required(),
    replyId: Joi.string().required()
});