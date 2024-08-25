import { Router } from "express";
import { ChangesController } from "./changes";
import { getAllChanges, validate,  } from "@middlewares";

let ChangesRouter = Router()

ChangesRouter
    .get("/all", validate(getAllChanges, "query"), ChangesController.GetAllChanges)
    .get("/get-startpagetoken", ChangesController.GetStartPageToken)
    .get("/watch-changes", ChangesController.WatchChanges)


export {ChangesRouter}