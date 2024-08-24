import { Router } from "express";
import { AuthRouter, CommentsRouter, FilesRouter, PermissionsRouter } from "@modules";

const router = Router()

router.use("/auth", AuthRouter)
router.use("/files", FilesRouter)
router.use("/comments", CommentsRouter)
router.use("/permissions", PermissionsRouter)


export default router