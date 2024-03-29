import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
    const { authorization, api_key } = req.headers;
    
    try {
        // Routes free from the authorization
        if (req.path.match(/docs/g)?.length) {
            return next();

            // Routes with authorization of api_key
        } else if (req.path.match(/login|signup/g)?.length && api_key) {
            return next();
        } else if (!authorization || !api_key) {
            throw new Error();
        } else {
            jwt.verify(authorization, process?.env?.JWT_SECRET as string);
            jwt.verify(api_key as string, process?.env?.JWT_SECRET as string);
        }
        return next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
};
