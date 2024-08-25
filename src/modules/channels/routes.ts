import { Router } from "express";
import { ChannelsController } from "./channels";
import { stopChannelDto, validate, watchChannelDto } from "@middlewares";

let ChannelsRouter = Router()

ChannelsRouter
    .post("/watch-channel", validate(watchChannelDto), ChannelsController.WatchChannel)
    .post("/stop-channel", validate(stopChannelDto), ChannelsController.StopChannel)

export {ChannelsRouter}