import { Router } from "express";
import { RevisionsController } from "./revisions";
import { deleteRevisionDto, getAllRevisonsDto, getRevisionById, updateRevisionDto, validate } from "@middlewares";

let RevisionRouter = Router()

RevisionRouter
    .get("/all", validate(getAllRevisonsDto, "query"), RevisionsController.GetAllRevisions)
    .get("/get-by-id", validate(getRevisionById, "query"), RevisionsController.GetRevisionById)
    .patch("/update", validate(updateRevisionDto), RevisionsController.UpdateRevision)
    .delete("/delete", validate(deleteRevisionDto), RevisionsController.DeleteRevision)



export {RevisionRouter}