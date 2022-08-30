import bcrypt from "bcrypt";
import { Request as RequestExpress, Response } from "express";
import { AppDataSource } from "@config/database";
import { User } from "@models/User";

type Request = RequestExpress<
    { id: string },
    any,
    { name: string; email: string; password: string }
>;

export const UserRepository = AppDataSource.getRepository(User);

export default class UserController {
    // Get all users from the database
    async getUsers(_req: Request, res: Response) {
        const users = await UserRepository.find();
        res.status(200).json(users);
    }

    // Create user in database
    async postUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            await UserRepository.save({
                name,
                email,
                password: passwordHash,
            });

            res.sendStatus(202);
        } catch (err) {
            res.sendStatus(400);
        }
    }

    // Update user in database
    async putUser(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await UserRepository.update(id, {
            name,
            email,
            password: passwordHash,
        });
        res.status(200).json(user);
    }

    //Delete a user from the database
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await UserRepository.delete(id);

        res.status(200).json(user);
    }
}
