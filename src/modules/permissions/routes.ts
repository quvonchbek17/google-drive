import { Router } from "express";
import { PermissionsController } from "./permissions";
import { createPermissionDto, deletePermissionDto, getAllPermissionsDto, getPermissionByIdDto, updatePermissionDto, validate } from "@middlewares";

let PermissionsRouter = Router()

PermissionsRouter
    .get("/all", validate(getAllPermissionsDto, "query"), PermissionsController.GetAllPermissions)
    .get("/get-by-id", validate(getPermissionByIdDto, "query"), PermissionsController.GetPermissionById)
    .post("/create", validate(createPermissionDto), PermissionsController.CreatePermission)
    .patch("/update",validate(updatePermissionDto), PermissionsController.UpdatePermission)
    .delete("/delete",validate(deletePermissionDto), PermissionsController.DeletePermission)



export {PermissionsRouter}