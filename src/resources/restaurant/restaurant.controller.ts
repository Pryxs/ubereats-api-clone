import { Request, Response } from 'express';
import { RestaurantsService } from './restaurant.service';
import type { IResponse } from '../../types/type';
import type { IRestaurant } from './restaurant.model';
import { IFood } from '../food/food.model';

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

export const getRestaurantFood = async (req: Request, res: Response<IResponse<IFood[]>>) => {
  try {
    const { id } = req.params;

    console.log(id)

    if (!id) return res.status(400).send({ ok: false, message: 'Missing parameters' })

    const foods = await restaurantService.getFoodByRestaurant(id)
    res.status(200).send({ ok: true, data: foods });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const getRestaurantById = async (req: Request<{ id: string }>, res: Response<IResponse<IRestaurant | null>>) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ ok: false, message: 'Missing parameters' })

    const restaurant = await restaurantService.getRestaurantById(id)
    res.status(200).send({ ok: true, data: restaurant });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const updateRestaurant = async (req: Request<{ id: string }>, res: Response<IResponse<IRestaurant | null>>) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ ok: false, message: 'Missing parameters' })

    // check si token peut modif id

    const restaurant = await restaurantService.updateRestaurant(id, req.body)
    res.status(200).send({ ok: true, data: restaurant });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }

}