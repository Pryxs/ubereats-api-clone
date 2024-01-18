import { Request, Response } from 'express';
import { FoodService } from './food.service';
import type { IResponse } from '../../types';
import type { IFood } from './food.model';

const foodService = FoodService()

export const createFood = async (req: Request, res: Response<IResponse<IFood>>) => {
  try {
    const food = await foodService.create(req.body)
    res.status(201).send({ ok: true, data: food });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const getFoodById = async (req: Request<{ id: string }>, res: Response<IResponse<IFood | null>>) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ ok: false, message: 'Missing parameters' })

    const food = await foodService.getById(id)
    res.status(200).send({ ok: true, data: food });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }
}

export const updateFood = async (req: Request<{ id: string }>, res: Response<IResponse<IFood | null>>) => {
  try {
    const { id } = req.params;

    const files = req.files as Express.Multer.File[];
    const filesName = files?.map(file => file.filename)

    console.log(files)

    const data = {...req.body, images: filesName}

    if (!id) return res.status(400).send({ ok: false, message: 'Missing parameters' })

    const food = await foodService.update(id, data)
    res.status(200).send({ ok: true, data: food });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Internal server error' });
  }

}