import { Router } from "express";
import { CommentController } from "./comments";
import { createCommentDto, deleteCommentDto, getAllCommentsDto, getCommentByIdDto, replyToCommentDto, updateCommentDto, validate } from "@middlewares";

let CommentsRouter = Router()

CommentsRouter
    .get("/all", validate(getAllCommentsDto, "query"), CommentController.GetAllComments)
    .get("/get-by-id", validate(getCommentByIdDto, "query"), CommentController.GetCommentById)

    .post("/create", validate(createCommentDto), CommentController.CreateComment)
    .post("/reply-to-comment", validate(replyToCommentDto), CommentController.ReplyToComment)

    .put("/update", validate(updateCommentDto), CommentController.UpdateComment)
    .delete("/delete", validate(deleteCommentDto), CommentController.DeleteComment)


export {CommentsRouter}