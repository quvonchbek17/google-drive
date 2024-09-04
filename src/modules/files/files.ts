import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder } from "@config";
import path from "path"
import * as fs from "fs"

let fileFields = "files(id, name, description, size, thumbnailLink, modifiedTime, createdTime, shared, trashed, webViewLink, parents, mimeType)"
export class FilesController {
  static async GetFiles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      let { limit } = req.query
      const result = await drive.files.list({
        pageSize: Number(limit),
        fields: fileFields,
      });
      res.status(200).send({
        success: true,
        message: "file list",
        data: result.data?.files
      })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }


  static async GetFilesByFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      let { limit, mimetype, name, folderId, trashed, order_by_created_at, order_by_name, start_created_at, end_created_at} = req.query

      let q = ""
      if(mimetype){
        q += q === "" ? `mimeType = '${mimetype}' `: ` and mimeType = '${mimetype}' `
      }

      if(name){
        q += q === "" ? `name contains '${name}' `: ` and name contains = '${name}' `
      }

      if(folderId){
        q += q === "" ? `'${folderId}' in parents `: ` and '${folderId}' in parents `
      }

      if(trashed === "true" || Boolean(trashed) === true){
        q += q === "" ? `trashed = true `: ` and trashed = true `
      }

      let orderBy = ""
      if(order_by_created_at){
        orderBy = order_by_created_at === "asc" ? "createdTime asc" : "createdTime desc"
      }

      if(order_by_name){
        orderBy = order_by_name === "asc" ? "name asc" : "name desc"
      }

      if(start_created_at && end_created_at){
        q += q === "" ? `createdTime >= '${start_created_at}' and createdTime <= '${end_created_at}' ` : ` and createdTime >= '${start_created_at}' and createdTime <= '${end_created_at}' `
      }

      if(start_created_at && !end_created_at){
         q += q === "" ? `createdTime >= '${start_created_at}' ` : ` and createdTime >= '${start_created_at}' `
      }

      if(!start_created_at && end_created_at){
        q += q === "" ? `createdTime <= '${end_created_at}' ` : ` and createdTime <= '${end_created_at}' `
      }


      const result = await drive.files.list({
        pageSize: Number(limit),
        q,
        fields: fileFields,
        orderBy
      });

      res.status(200).send({
        success: true,
        message: `Filterlangan filelar`,
        data: result.data?.files
      })
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      let { name, parents } = req.body

      const file = req.file as Express.Multer.File | undefined;

      const fileMetadata = {
        name,
        parents: parents? JSON.parse(parents): []
      };

      let filePath = ""
      let media
      if(file){
        filePath = path.join(process.cwd(), "uploads", file.fieldname)
        media = {
          mimeType: file.mimetype,
          body: fs.createReadStream(filePath),
        };
      }

      const result = await drive.files.create({
        requestBody: fileMetadata,
        media: media
      });

      res.status(200).send({
        success: true,
        message: "File upload qilindi",
        data: result.data,
      });

      fs.unlink(filePath, (err) => {})
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      let { id, name, parents } = req.body

      const file = req.file as Express.Multer.File | undefined;

      parents = parents ? JSON.parse(parents): parents

      let filePath = ""
      let media
      if(file){
        filePath = path.join(process.cwd(), "uploads", file.fieldname)
        media = {
          mimeType: file.mimetype,
          body: fs.createReadStream(filePath),
        };
      }

      const result = await drive.files.update({
        fileId: id,
        requestBody: {
          name,
          parents
        },
        media
      });

      res.status(200).send({
        success: true,
        message: 'File yangilandi',
        data: result.data,
      });

      fs.unlink(filePath, (err) => {})
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeleteFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      let { id } = req.body

      await drive.files.delete({
        fileId: id,
      });

      res.status(200).send({
        success: true,
        message: "File o'chirildi",
      });

    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CopyFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const { id, newFileName } = req.body;

      const result = await drive.files.copy({
        fileId: id,
        requestBody: {
          name: newFileName,
        }
      });

      res.status(200).send({
        success: true,
        message: 'File nusxalandi',
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async MoveFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const { id, newParentId } = req.body;

      const file = await drive.files.get({
        fileId: id,
        fields: 'parents',
      });

      const previousParents = file.data.parents?.join(',');

      const result = await drive.files.update({
        fileId: id,
        addParents: newParentId,
        removeParents: previousParents
      });

      res.status(200).send({
        success: true,
        message: "File ko'chirildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async MoveToTrash(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      let { id } = req.body

      const result = await drive.files.update({
        fileId: id,
        requestBody: {
          trashed: true
        }
      });

      res.status(200).send({
        success: true,
        message: "File Trashga o'tkazildi",
        data: result.data
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async ClearTrash(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      await drive.files.emptyTrash()

      res.status(200).send({
        success: true,
        message: "Trash tozalandi"
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

}
