import { Router } from "express";
import { AuthRouter, FilesRouter } from "@modules";

const router = Router()

router.use("/auth", AuthRouter)
router.use("/files", FilesRouter)

export default router