import { Router } from "express";
import { AboutRouter, AppsRouter, AuthRouter, ChangesRouter, ChannelsRouter, CommentsRouter, DrivesRouter, FilesRouter, PermissionsRouter, RevisionRouter } from "@modules";
import { RepliesRouter } from "src/modules/replies";

const router = Router()

router.use("/auth", AuthRouter)
router.use("/files", FilesRouter)
router.use("/comments", CommentsRouter)
router.use("/permissions", PermissionsRouter)
router.use("/revisions", RevisionRouter)
router.use("/drives", DrivesRouter)
router.use("/replies", RepliesRouter)
router.use("/about", AboutRouter)
router.use("/apps", AppsRouter)
router.use("/changes", ChangesRouter)
router.use("/channels", ChannelsRouter)


export default router