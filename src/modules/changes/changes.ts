import { Request, Response, NextFunction } from "express";
import { driveBuilder } from "@config";
import { ErrorHandler } from "@errors";

export class ChangesController {

  static async GetAllChanges(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { pageToken, pageSize } = req.query;
      const result = await drive.changes.list({
        pageToken: String(pageToken),
        pageSize: Number(pageSize) || 100,
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "O'zgarishlar ro'yxati",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async GetStartPageToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const result = await drive.changes.getStartPageToken();

      res.status(200).send({
        success: true,
        message: "Start page token",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async WatchChanges(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { pageToken, id, type, address } = req.body;

      const result = await drive.changes.watch({
        pageToken: String(pageToken), // required
        requestBody: {
          id,      // ID of the channel
          type,    // Type of the channel ("web_hook")
          address, // Address of the receiving entity
        },
      });

      res.status(200).send({
        success: true,
        message: "O'zgarishlar kuzatilmoqda",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
