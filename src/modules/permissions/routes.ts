import { Router } from "express";
import { PermissionsController } from "./permissions";
import { createPermissionDto, validate } from "@middlewares";

let PermissionsRouter = Router()

PermissionsRouter
    .post("/create", validate(createPermissionDto), PermissionsController.CreatePermission)



export {PermissionsRouter}