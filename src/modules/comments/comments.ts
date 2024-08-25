import { Request, Response, NextFunction } from "express";
import { drive_v3 } from "googleapis";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

let commentFields = "id, content, author, createdTime, modifiedTime, deleted, replies";

export class CommentController {
  static async GetAllComments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId } = req.query;
      const response = await drive.comments.list({
        fileId: String(fileId),
        fields: "comments",
      });

      res.status(200).send({
        success: true,
        message: "Commentlar",
        data: response.data.comments,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetCommentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId } = req.query;
      const result = await drive.comments.get({
        commentId: String(commentId),
        fileId: String(fileId),
        fields: commentFields,
      });

      res.status(200).send({
        success: true,
        message: "Comment",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, content } = req.body;

      const comment: drive_v3.Schema$Comment = {
        content,
      };

      const response = await drive.comments.create({
        fileId,
        requestBody: comment,
        fields: commentFields,
      });

      res.status(200).send({
        success: true,
        message: "Comment muvaffaqiyatli yaratildi",
        data: response.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId, content } = req.body;

      const result = await drive.comments.update({
        fileId,
        commentId,
        requestBody: { content },
        fields: commentFields,
      });

      res.status(200).send({
        success: true,
        message: "Comment update qilindi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeleteComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId } = req.body;
      await drive.comments.delete({
        fileId: String(fileId),
        commentId: String(commentId),
      });

      res.status(200).send({
        success: true,
        message: "Comment o'chirildi",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

}
