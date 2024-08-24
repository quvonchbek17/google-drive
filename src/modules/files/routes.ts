import { Router } from "express";
import { FilesController } from "./files";
import { copyFileDto, createFileDto, deleteFileDto, getFilesByFilterDto, getFilesDto, moveFileDto, updateFileDto, validate } from "@middlewares";
import { upload } from "@config";

let FilesRouter = Router()

FilesRouter
    .get("/all", validate(getFilesDto, "query"), FilesController.GetFiles)
    .get("/by-filter", validate(getFilesByFilterDto, "query"), FilesController.GetFilesByFilter)

    .post("/create", upload.single("file"), validate(createFileDto), FilesController.CreateFile)
    .post("/copy-file", validate(copyFileDto), FilesController.CopyFile)
    .post("/move-file", validate(moveFileDto), FilesController.MoveFile)

    .patch("/update", upload.single("file"), validate(updateFileDto), FilesController.UpdateFile)


    .delete("/delete", validate(deleteFileDto), FilesController.DeleteFile)
    .delete("/move-to-trash", validate(deleteFileDto), FilesController.MoveToTrash)
    .delete("/clear-trash", FilesController.ClearTrash)

export {FilesRouter}