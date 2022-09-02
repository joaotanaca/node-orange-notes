import express from "express";
import AuthController from "@controllers/Auth";
import validationPassword from "@middlewares/validationPassword";
import validateUser from "@middlewares/validateUser";

const Router = express.Router();

class Auth {
    constructor() {
        const auth = new AuthController();
        Router.post("/login", validationPassword, auth.login);
        Router.post("/signup", validateUser, auth.signup);
        // Router.post("/", validateUser, user.postUser);
        // Router.put("/:id", user.putUser);
        // Router.delete("/:id", user.deleteUser);
    }
}

new Auth();

export default Router;
