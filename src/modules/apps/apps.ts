import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

export class AppsController {


  static async GetAllApps(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const result = await drive.apps.list({
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "Barcha applar ro'yxati",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status || 500));
    }
  }

  static async GetAppById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { appId } = req.query;
      const result = await drive.apps.get({
        appId: String(appId),
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "App ma'lumotlari",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status || 500));
    }
  }
}
