import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { AppDataSource } from "@config/database";
import { User } from "@models/User";
import { Request } from "./User";

export const UserRepository = AppDataSource.getRepository(User);

export default class AuthController {
    // Verify email is exist in the database and check password
    async login(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const user = await UserRepository.findOne({
                where: { email },
                select: { email: true, name: true, id: true },
            });

            const token = jwt.sign({ user }, "test", {
                expiresIn: 15 * 60,
            });

            return res.status(200).json(token);
        } catch (err) {
            return res.status(400).json({ error: err });
        }
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

    //Delete a user from the database
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await UserRepository.delete(id);

        res.status(200).json(user);
    }
}
