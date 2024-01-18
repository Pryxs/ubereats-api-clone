import { Request, Response } from 'express';
import { IResponse } from '../../types';
import { check } from '../../utils/crypto';
import type { IRestaurant } from '../restaurant/restaurant.model';
import { AuthService } from './auth.service';
import { RestaurantsService } from '../restaurant/restaurant.service';
import jwt from 'jsonwebtoken';

const authService = AuthService()
const restaurantsService = RestaurantsService();


export const login = async (req: Request<{ id: string }>, res: Response<IResponse<{ token: string }>>) => {
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) return res.status(500).send({ ok: false, message: 'Internal server error' })

    try {
        const { email, password } = req.body

        const restaurant = await authService.getRestaurantByMail(email)
        if (!restaurant) return res.status(400).send({ ok: false, message: 'Restaurant not found' })

        const isCheck = check(password, restaurant.password)
        if (!isCheck) return res.status(401).send({ ok: false, message: 'Password incorrect' })

        const token = jwt.sign({ email, role: 'owner' }, secretKey);

        res.send({ ok: true, data: { token } });
    } catch (error) {
        res.status(500).send({ ok: false, message: 'Internal server error' });
    }
}

export const showRestaurant = async (req: Request<{ id: string }>, res: Response<IResponse<IRestaurant | null>>) => {
    try {
        const { email, password } = req.body
        console.log(email, password);

        const restaurant = await authService.getRestaurantByMail(email)
        // console.log(restaurant);
        if (restaurant === null) return res.status(400).send({ ok: false, message: 'No restaurant associated with this email' })

        return res.status(200).send({ ok: true, data: restaurant })
        // return await check(password, restaurant.password)

    } catch (error) {
        res.status(500).send({ ok: false, message: 'Internal server error' });
    }
}