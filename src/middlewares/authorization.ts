import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const { Authorization } = req.headers;
    if (!Authorization) {
        next();
    } else {
        return res.sendStatus(401);
    }
};
