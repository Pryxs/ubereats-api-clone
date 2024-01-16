import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type TokenType = {
    email: string;
    role: string;
}

export const authentificator = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const secretKey = process.env.SECRET_KEY
        console.log(secretKey)
        try {
            if (!secretKey) throw new Error()

            const token = req.headers?.authorization;

            if (!token) throw new Error();

            const { role } = jwt.verify(token, secretKey) as TokenType;

            if (!role && role !== 'owner') throw new Error();

            next();
        } catch (err) {
            return res.status(401).json('Invalid token')
        }
    }
}