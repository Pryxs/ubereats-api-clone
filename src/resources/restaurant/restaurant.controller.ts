import { Request, Response } from 'express';
import { RestaurantsService } from './restaurant.service';
import type { IResponse } from '../../types/type';
import type { IRestaurant } from './restaurant.model';

const restaurantService = RestaurantsService()

export const createRestaurant = async (req: Request, res: Response<IResponse<IRestaurant>>) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body)
    res.status(201).send({ ok: true, data: restaurant });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const getAllRestaurants = async (req: Request, res: Response<IResponse<IRestaurant[]>>) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants()
    res.status(200).send({ ok: true, data: restaurants });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const getRestaurantById = async (req: Request<{ id: string }>, res: Response<IResponse<IRestaurant | null>>) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ ok: false, message: 'Missing parameters' })

    const restaurant = await restaurantService.getRestaurantById(req.params.id)
    res.status(200).send({ ok: true, data: restaurant });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}