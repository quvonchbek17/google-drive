import { Router } from "express";
import {AuthController} from "./auth";

const AuthRouter = Router()

AuthRouter.get('/login', AuthController.googleLogin);
AuthRouter.get('/callback', AuthController.googleCallback);
AuthRouter.get('/logout', AuthController.logout);

export {AuthRouter}