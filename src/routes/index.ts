import { Router } from "express";
import { AuthRouter, CommentsRouter, FilesRouter, PermissionsRouter, RevisionRouter } from "@modules";

const router = Router()

router.use("/auth", AuthRouter)
router.use("/files", FilesRouter)
router.use("/comments", CommentsRouter)
router.use("/permissions", PermissionsRouter)
router.use("/revisions", RevisionRouter)


export default router