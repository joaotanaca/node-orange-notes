import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (authorization === "tanaca" || req.path.match(/docs|login/g)?.length) {
        next();
    } else {
        return res.sendStatus(401);
    }
};
