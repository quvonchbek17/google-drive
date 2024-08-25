import { Request, Response, NextFunction } from "express";
import { drive_v3 } from "googleapis";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

let permissionFields =
  "id, type, emailAddress, role, allowFileDiscovery, displayName, domain, expirationTime, teamDrivePermissionDetails, photoLink, view, deleted, pendingOwner, permissionDetails";

export class PermissionsController {

  static async GetAllPermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId } = req.query;

      const result = await drive.permissions.list({
        fileId: String(fileId),
        fields: `permissions(${permissionFields})`,
      });

      res.status(200).send({
        success: true,
        message: 'Filega berilgan ruxsatlar',
        data: result.data.permissions,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetPermissionById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, permissionId } = req.query;

      const result = await drive.permissions.get({
        fileId: String(fileId),
        permissionId: String(permissionId),
        fields: permissionFields,
      });

      res.status(200).send({
        success: true,
        message: "Permission batafsil ma'lumotlari",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreatePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, role, type, emailAddress, expirationTime } = req.body;

      const permission: drive_v3.Schema$Permission = {
        role,
        type,
        emailAddress, // emailAddress kiritish ixtiyoriy, agar `type` 'user' bo'lsa.
        expirationTime
      };

      const result = await drive.permissions.create({
        fileId,
        requestBody: permission,
        fields: permissionFields,
      });

      res.status(200).send({
        success: true,
        message: "Permission yaratildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdatePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, permissionId, role } = req.body;

      const result = await drive.permissions.update({
        fileId,
        permissionId,
        requestBody: {
          role
        },
        fields: permissionFields,
        transferOwnership: role === "owner"
      });

      res.status(200).send({
        success: true,
        message: 'Permission yangilandi',
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeletePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, permissionId } = req.body;

      await drive.permissions.delete({
        fileId: String(fileId),
        permissionId: String(permissionId),
      });

      drive.revisions
      res.status(200).send({
        success: true,
        message: "Permission o'chirildi ",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
