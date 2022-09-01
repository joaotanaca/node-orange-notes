import authorization from "@middlewares/authorization";
import { serve, setup } from "swagger-ui-express";
import { Express } from "express";
import User from "./Users";
import swaggerDocument from "../config/swagger_output.json";

export default class Routes {
    private app: Express;
    constructor(_app: Express) {
        this.app = _app;
    }

    initialize() {
        this.app.use(authorization);
        this.app.get("/", (_req, res) => res.send("Hello World!"));
        this.app.use("/api-docs", serve, setup(swaggerDocument));
        this.app.use("/user", User);
    }
}
