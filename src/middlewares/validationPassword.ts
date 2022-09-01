import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import { Request, UserRepository } from "@controllers/User";

export default async function (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { email, password } = req.body;

    // Validate fields
    if (!(email && password)) {
        return res.status(400).send("Todos os campos devem ser enviados");
    }

    try {
        const user = await UserRepository.findOne({
            where: { email },
            cache: 10 * 1000,
        });

        const passwordValidation = await bcrypt.compare(
            password,
            user?.password as string,
        );

        // Validate the password
        if (!passwordValidation || !user) {
            throw new Error();
        }

        next();
    } catch (err) {
        // Send the error message
        return res.status(400).json({ message: "Email ou senha invalida" });
    }
}
