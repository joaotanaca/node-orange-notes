import { Request as RequestExpress, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@config/database";
import { Task } from "@models/Task";
import calcPercentage from "helpers/calcPercentage";

export type Request = RequestExpress<{ id: string }, any, Task>;

export const TaskRepository = AppDataSource.getRepository(Task);

export default class TaskController {
    // Get all users from the database
    async getTasks(req: Request, res: Response) {
        const { user } = jwt.decode(
            req?.headers?.authorization as string,
        ) as any;

        try {
            const tasks = await TaskRepository.find({
                where: { userId: user.id },
                relations: { subtasks: true },
            });

            const tasksWithPercents = tasks.map(({ subtasks, ...task }) => ({
                ...task,
                percentage: calcPercentage(subtasks),
            }));

            res.status(200).json(tasksWithPercents);
        } catch (err) {
            console.error(err);
            res.status(400);
        }
    }

    // Get task from the database
    async getTask(req: Request, res: Response) {
        console.log(req.params);

        const task = await TaskRepository.findOne({
            where: { id: req.params.id },
            relations: { subtasks: true },
        });

        res.status(200).json(task);
    }

    // Create task in database
    async postTasks(req: Request, res: Response) {
        const { title, subtitle, description, subtasks, userId } = req.body;

        try {
            await TaskRepository.save({
                title,
                subtitle,
                description,
                subtasks,
                userId,
            });

            res.sendStatus(202);
        } catch (err) {
            console.error(err);

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
