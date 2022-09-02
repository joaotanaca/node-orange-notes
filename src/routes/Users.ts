import express from "express";
import validateUser from "@middlewares/validateUser";
import UserController from "@controllers/User";

const Router = express.Router();

class User {
    constructor() {
        const user = new UserController();
        Router.get("s/", user.getUsers);
        Router.get("/", user.getUser);
        Router.post("/", validateUser, user.postUser);
        Router.put("/:id", user.putUser);
        Router.delete("/:id", user.deleteUser);
    }
}

new User();

export default Router;
