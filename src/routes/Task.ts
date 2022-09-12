import express from "express";
import TaskController from "@controllers/Task";

const Router = express.Router();

class Task {
    constructor() {
        const task = new TaskController();
        Router.get("/", task.getTasks);
        Router.get("/:id", task.getTask);
        Router.post("/", task.postTasks);
        Router.put("/:id", task.putTasks);
        Router.delete("/:id", task.deleteTasks);
    }
}

new Task();

export default Router;
