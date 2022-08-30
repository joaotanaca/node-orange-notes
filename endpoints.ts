import { Express, Request } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "./src/config/database";
import { User } from "./src/models/User";
import validateUser from "./src/middlewares/validateUser";

export const UserRepository = AppDataSource.getRepository(User);

export type RequestUser = Request<
    { id: string },
    any,
    { name: string; email: string; password: string }
>;

export default (app: Express) => {
    app.get("/users", async (_req, res) => {
        const users = await UserRepository.find();
        res.status(200).json(users);
    });

    app.post("/user", validateUser, async (req: RequestUser, res) => {
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
    });

    app.put("/user/:id", async (req: RequestUser, res) => {
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
    });

    app.delete("/user/:id", async (req: RequestUser, res) => {
        const { id } = req.params;
        const user = await UserRepository.delete(id);

        res.status(200).json(user);
    });
};
