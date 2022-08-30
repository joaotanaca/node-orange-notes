import authorization from "@middlewares/authorization";
import { Express } from "express";
import User from "./Users";

export default class Routes {
    private app: Express;
    constructor(_app: Express) {
        this.app = _app;
    }

    initialize() {
        this.app.use(authorization);
        this.app.use("/user", User);
    }
}
