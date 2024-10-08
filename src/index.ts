import express, { Application, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "@middlewares";
import router from "./routes";
import "./config/passport";
import path from "path";
dotenv.config();

const app: Application = express();

//// cors
app.use(cors({ origin: "*" }));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"))

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "src", "public")))

app.use(router);

app.get('/', (req, res) => res.render("index.ejs"));

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(port);
});
