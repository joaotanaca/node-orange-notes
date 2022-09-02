import jwt from "jsonwebtoken";

export default function (data: string | object | Buffer) {
    const token = jwt.sign(data, process?.env?.JWT_SECRET as string, {
        expiresIn: 15 * 60, //Convert seconds to minutes,
    });

    return token;
}
