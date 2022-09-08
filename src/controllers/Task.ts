import { Request as RequestExpress, Response } from "express";
import { AppDataSource } from "@config/database";
import { Task } from "@models/Task";

export type Request = RequestExpress<{ id: string }, any, Task>;

export const TaskRepository = AppDataSource.getRepository(Task);

export default class TaskController {
    // Get all users from the database
    async getTasks(_req: Request, res: Response) {
        const users = await TaskRepository.find();
        res.status(200).json(users);
    }

    // Get task from the database
    async getTask(req: Request, res: Response) {
        const task = await TaskRepository.findOne({
            where: { id: req.params.id },
        });

        res.status(200).json(task);
    }

    // Create task in database
    async postTasks(req: Request, res: Response) {
        try {
            await TaskRepository.save({});

            res.sendStatus(202);
        } catch (err) {
            res.sendStatus(400);
        }
    }

    // Update task in database
    async putTasks(req: Request, res: Response) {
        const { id } = req.params;
        const task = await TaskRepository.update(id, {});
        res.status(200).json(task);
    }

    //Delete a task from the database
    async deleteTasks(req: Request, res: Response) {
        const { id } = req.params;
        const task = await TaskRepository.delete(id);

        res.status(200).json(task);
    }
}
