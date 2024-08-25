import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

export class DrivesController {

    static async GetAllDrives(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const token = req.headers.access_token as string;
        const drive = await driveBuilder(token);

        const result = await drive.drives.list({
          fields: "*",
        });

        res.status(200).send({
          success: true,
          message: "Drives ro'yxati",
          data: result.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.status || 500));
      }
    }

    static async GetDriveById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const token = req.headers.access_token as string;
        const drive = await driveBuilder(token);

        let { driveId } = req.query
        const result = await drive.drives.get({
          driveId: String(driveId),
          fields: "*",
        });

        res.status(200).send({
          success: true,
          message: "Drive haqida batafsil",
          data: result.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.status || 500));
      }
    }

    static async CreateDrive(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const token = req.headers.access_token as string;
        const drive = await driveBuilder(token);

        const { name, backgroundImageFileId } = req.body;

        const requestId = `drive-create-${Date.now()}`;
        const result = await drive.drives.create({
          requestBody: {
            name: name,
            backgroundImageFile: backgroundImageFileId
          },
          fields: "*", // Yangi yaratgan Drive'ning barcha maydonlarini olish,
          requestId
        });

        res.status(201).send({
          success: true,
          message: "Drive yaratildi",
          data: result.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.status || 500));
      }
    }

    static async UpdateDrive(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const token = req.headers.access_token as string;
        const drive = await driveBuilder(token);

        const { driveId, name, backgroundImageFileId } = req.body;

        const result = await drive.drives.update({
          driveId: driveId,
          requestBody: {
            name: name,
            backgroundImageFile: backgroundImageFileId,
          },
          fields: "*",
        });

        res.status(200).send({
          success: true,
          message: "Drive yangilandi",
          data: result.data,
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.status || 500));
      }
    }

    static async DeleteDrive(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const token = req.headers.access_token as string;
        const drive = await driveBuilder(token);

        const {driveId} = req.body;

        await drive.drives.delete({
          driveId: driveId,
        });

        res.status(200).send({
          success: true,
          message: "Drive o'chirildi",
        });
      } catch (error: any) {
        next(new ErrorHandler(error.message, error.status || 500));
      }
    }

    static async HideDrive(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const token = req.headers.access_token as string;
          const drive = await driveBuilder(token);

          const {driveId} = req.body;

          await drive.drives.hide({
            driveId
          });

          res.status(200).send({
            success: true,
            message: "Drive yashirildi",
          });
        } catch (error: any) {
          next(new ErrorHandler(error.message, error.status || 500));
        }
    }

    static async UnHideDrive(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const token = req.headers.access_token as string;
          const drive = await driveBuilder(token);

          const {driveId} = req.body;

          await drive.drives.unhide({
            driveId
          });

          res.status(200).send({
            success: true,
            message: "Drive ko'rsatildi",
          });
        } catch (error: any) {
          next(new ErrorHandler(error.message, error.status || 500));
        }
    }
  }