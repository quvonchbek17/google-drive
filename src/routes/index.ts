import { Router } from "express";
import { AuthRouter, DriveRouter } from "@modules";

const router = Router()

router.use("/auth", AuthRouter)
router.use("/drive", DriveRouter)

export default router