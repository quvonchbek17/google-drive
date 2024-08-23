import { Request, Response, NextFunction } from "express";
import passport from "passport";
import * as fs from "fs"
import dotenv from "dotenv";
import path from "path";
dotenv.config();

export class AuthController {
  // Redirect to Google login
  static googleLogin(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/drive"],
    })(req, res, next);
  }

  // Google login callback
  static googleCallback(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("google", {
      failureRedirect: "/auth/login",
    })(req, res, () => {

      const tokens = (req.user as any).tokens;
      let tokensJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "tokens.json"), "utf-8"))

      tokensJson.push(tokens)
      fs.writeFileSync(path.join(process.cwd(), "tokens.json"), JSON.stringify(tokensJson, null, 2))
      res.send(tokens)
    });
  }

  // Logout
  static logout(req: Request, res: Response): void {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to destroy session" });
        }
        res.redirect("/login");
      });
    });
  }
}
