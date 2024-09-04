import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

export class RevisionsController {
  static async GetAllRevisions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId } = req.query;
      const result = await drive.revisions.list({
        fileId: String(fileId),
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "File tarixi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetRevisionById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, revisionId } = req.query;
      const result = await drive.revisions.get({
        fileId: String(fileId),
        revisionId: String(revisionId),
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "Revision haqida batafsil",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateRevision(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, revisionId, published, publishAuto, publishedOutsideDomain } = req.body;

      const result = await drive.revisions.update({
        fileId: String(fileId),
        revisionId: String(revisionId),
        requestBody: {
            publishAuto,
            published,
            publishedOutsideDomain
        },
      });

      res.status(200).send({
        success: true,
        message: 'Revision yangilandi',
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeleteRevision(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, revisionId } = req.body;

      await drive.revisions.delete({
        fileId: String(fileId),
        revisionId: String(revisionId),
      });

      res.status(200).send({
        success: true,
        message: "Revision o'chirildi",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
