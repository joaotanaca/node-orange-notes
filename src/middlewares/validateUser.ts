import { NextFunction, Response } from "express";
import { RequestUser, UserRepository } from "../../endpoints";

export default async function (
    req: RequestUser,
    res: Response,
    next: NextFunction,
) {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
        return res.status(400).send("Precisa enviar todos os campos.");
    }

    const existUser = await UserRepository.find({ where: { email } });

    if (existUser.length) {
        return res.status(409).send("Usuario já existe");
    }
    next();
}
