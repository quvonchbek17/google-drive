import { Router } from "express";
import { DrivesController } from "./drives";
import { validate, createDriveDto, updateDriveDto, getDriveByIdDto, deleteDriveDto, hideDriveDto, unHideDriveDto } from "@middlewares";

let DrivesRouter = Router()

DrivesRouter
    .get("/all", DrivesController.GetAllDrives)
    .get("/get-by-id", validate(getDriveByIdDto, "query"), DrivesController.GetDriveById)
    .post("/create", validate(createDriveDto), DrivesController.CreateDrive)
    .post("/hide", validate(hideDriveDto), DrivesController.HideDrive)
    .post("/unhide", validate(unHideDriveDto), DrivesController.UnHideDrive)
    .patch("/update", validate(updateDriveDto), DrivesController.UpdateDrive)
    .delete("/delete", validate(deleteDriveDto), DrivesController.DeleteDrive)

export {DrivesRouter}