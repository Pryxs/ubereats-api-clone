import { Request, Response, NextFunction } from 'express';


export const validator = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
};