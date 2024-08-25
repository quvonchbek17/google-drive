import { Router } from "express";
import { AboutController } from "./about";

let AboutRouter = Router()

AboutRouter
    .get("/info", AboutController.GetAboutInfo)
export {AboutRouter}