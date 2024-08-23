import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

export class FilesController {
  static async GetFiles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const result = await drive.files.list({
        pageSize: 100,
        fields: "files(id, name)",
      });

      res.status(200).send({
        success: true,
        message: "file list",
        data: result
      })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
