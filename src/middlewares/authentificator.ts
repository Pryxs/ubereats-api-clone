import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RestaurantsService } from '../resources/restaurant/restaurant.service'

type TokenType = {
    email: string;
    role: string;
}

const restaurantService = RestaurantsService();

export const authentificator = () => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const secretKey = process.env.SECRET_KEY
        const { id } = req.params;
        try {
            if (!secretKey) throw new Error()

            const token = req.headers?.authorization;

            if (!token) throw new Error();

            const { email, role } = jwt.verify(token, secretKey) as TokenType;

            if (!role && role !== 'owner') throw new Error();

            if(id){
                const restaurant = await restaurantService.getRestaurantById(id)
                if(!restaurant) throw new Error();
                console.log(restaurant, email)
                if(email !== restaurant.email) throw new Error();
            }

            next();
        } catch (err) {
            return res.status(401).json('Invalid token')
        }
    }
}