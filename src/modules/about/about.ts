import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

export class AboutController {

  static async GetAboutInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const result = await drive.about.get({
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "Google Drive akkount info",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status || 500));
    }
  }
}
