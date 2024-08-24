import { Request, Response, NextFunction } from "express";
import { drive_v3 } from "googleapis";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";
import path from "path";
import * as fs from "fs";

let permissionFields = "id, type, emailAddress, role, allowFileDiscovery, displayName, domain, expirationTime, teamDrivePermissionDetails, photoLink, view, deleted, pendingOwner, permissionDetails";

export class PermissionsController {
    static async CreatePermission(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        try {
          const token = req.headers.access_token as string;
          const drive = await driveBuilder(token);

          const { fileId, role, type, emailAddress } = req.body;

          const permission: drive_v3.Schema$Permission = {
            role,
            type,
            emailAddress, // emailAddress kiritish ixtiyoriy, agar `type` 'user' bo'lsa.
          };

          const result = await drive.permissions.create({
            fileId,
            requestBody: permission,
            fields: permissionFields,
          });

          res.status(200).send({
            success: true,
            message: 'Permission yaratildi',
            data: result.data,
          });
        } catch (error: any) {
          next(new ErrorHandler(error.message, error.status));
        }
      }
}
