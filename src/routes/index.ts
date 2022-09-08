import authorization from "@middlewares/authorization";
import { serve, setup } from "swagger-ui-express";
import { Express } from "express";
import User from "./Users";
import Auth from "./Auth";
import Task from "./Task";
import swaggerDocument from "../config/swagger_output.json";

export default class Routes {
    private app: Express;
    constructor(_app: Express) {
        this.app = _app;
    }

    initialize() {
        this.app.use(authorization);
        this.app.use("/docs", serve, setup(swaggerDocument));
        this.app.use("/user", User);
        this.app.use("/auth", Auth);
        this.app.use("/task", Task);
    }
}
