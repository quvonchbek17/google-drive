import { Router } from "express";
import { RepliesController } from "./replies";
import { createReplyToCommentDto, deleteReplyDto, getAllRepliesDto, getReplyByIdDto, updateReplyDto, validate } from "@middlewares";

let RepliesRouter = Router()

RepliesRouter
    .get("/all", validate(getAllRepliesDto, "query"), RepliesController.GetAllReplies)
    .get("/get-by-id", validate(getReplyByIdDto, "query"), RepliesController.GetReplyById)
    .post("/create", validate(createReplyToCommentDto), RepliesController.CreateReplyToComment)
    .put("/update", validate(updateReplyDto), RepliesController.UpdateReply)
    .delete("/delete", validate(deleteReplyDto), RepliesController.DeleteReply)




export {RepliesRouter}