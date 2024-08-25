import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

export class ChannelsController {

  static async WatchChannel(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { resourceId, address, type, params } = req.body;

      const result = await drive.changes.watch({
        requestBody: {
          id: resourceId,
          type,
          address,
          params,
        },
      });

      res.status(200).json({
        success: true,
        message: "Kanal yaratildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async StopChannel(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { channelId } = req.body;

      await drive.channels.stop({
        requestBody: {
          id: channelId,
        },
      });

      res.status(200).json({
        success: true,
        message: "Kanal to'xtatildi",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

}
