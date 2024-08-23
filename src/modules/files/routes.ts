import { Router } from "express";
import { FilesController } from "./files";

let FilesRouter = Router()

FilesRouter.get("/files", FilesController.GetFiles)

export {FilesRouter}