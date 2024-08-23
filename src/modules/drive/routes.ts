import { Router } from "express";
import { DriveController } from "./drive";

let DriveRouter = Router()

DriveRouter.get("/files", DriveController.GetFiles)

export {DriveRouter}