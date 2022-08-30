import express from "express";
import UserController from "../../src/controllers/User";

const Router = express.Router();

class User {
    constructor() {
        const user = new UserController();
        Router.get("/", user.getUsers);
        Router.post("/", user.postUser);
        Router.put("/:id", user.putUser);
        Router.delete("/:id", user.deleteUser);
    }
}

new User();

export default Router;
