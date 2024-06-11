import express, { Request, Response, NextFunction } from "express";
import http from "http";
import * as mongoose from "mongoose";
import config from "./config/config";
import { router as appRouter } from "./routes/index";

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to mongoDB.");
    StartServer();
  })
  .catch((error) => {
    console.log("Unable to connect.");
    console.log(error);
  });

const StartServer = async () => {
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  //RULES OF OUR APIS
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-with,Content-Type,Accept,Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }
    next();
  });

  //API ROUTES WITH VERSION
  router.use("/API", appRouter);

  //API HEALTHCHECK
  router.get("/ping", (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json({ message: "pong" })
  );

  //API MAIN ROUTER "/"
  router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message:
        "You are on node-typescript-boilderplate. You should not have further access from here.",
    });
  });

  //API ERROR HANDLING
  router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("not found");
    console.log(error);
    return res.status(404).json({ success: false, message: error.message });
  });

  //HANDEL ALL ERROR THROW BY CONTROLLERS
  router.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err.stack);
    if (err) {
      return err.sendError(res);
    } else {
      return res.status(500).json({
        error: {
          title: "general_error",
          detail: "An error occurred, Please retry again later",
          code: 500,
        },
      });
    }
  });

  //YOUR SERVER LISTEN
  http
    .createServer(router)
    .listen(config.server.port, () =>
      console.log(`Server is running on port ${config.server.port}.`)
    );
};
