import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";

export class RepliesController {

  static async GetAllReplies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId } = req.query;
      const result = await drive.replies.list({
        fileId: String(fileId),
        commentId: String(commentId),
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "Javoblar ro'yxati",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async GetReplyById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId, replyId } = req.query;
      const result = await drive.replies.get({
        fileId: String(fileId),
        commentId: String(commentId),
        replyId: String(replyId),
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "Javob haqida batafsil ma'lumot",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async CreateReplyToComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId, content } = req.body;
      const result = await drive.replies.create({
        fileId: String(fileId),
        commentId: String(commentId),
        requestBody: {
          content: content,
        },
        fields: "*"
      });

      res.status(201).send({
        success: true,
        message: "Javob yaratildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async UpdateReply(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId, replyId, content } = req.body;
      const result = await drive.replies.update({
        fileId: String(fileId),
        commentId: String(commentId),
        replyId: String(replyId),
        requestBody: {
          content: content,
        },
        fields: "*"
      });

      res.status(200).send({
        success: true,
        message: "Javob yangilandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  // Javobni o'chirish
  static async DeleteReply(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { fileId, commentId, replyId } = req.body;
      await drive.replies.delete({
        fileId: String(fileId),
        commentId: String(commentId),
        replyId: String(replyId),
      });

      res.status(200).send({
        success: true,
        message: "Javob o'chirildi",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
