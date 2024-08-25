import { Router } from "express";
import { AppsController } from "./apps";
import { validate, createDriveDto, updateDriveDto, getDriveByIdDto, deleteDriveDto, hideDriveDto, unHideDriveDto, getAppById } from "@middlewares";

let AppsRouter = Router()

AppsRouter
    .get("/all", AppsController.GetAllApps)
    .get("/get-by-id", validate(getAppById, "query"), AppsController.GetAppById)

export {AppsRouter}