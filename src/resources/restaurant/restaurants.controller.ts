import { Request, Response } from 'express';

export const createRestaurant = (req: Request, res: Response) => {
    const { name, address, city, country, stars, cuisine, priceCategory } = req.body;
    const restaurant = { name, address, city, country, stars, cuisine, priceCategory };
    res.send(restaurant)
}

const test = {
    name: "McDo",
    address: "12 McDo Street",
    city: "Paris",
    country: "USA",
    stars: 4,
    cuisine: "Fast Food",
    priceCategory: 1
}

export const getAllRestaurants = (req: Request , res: Response) => {
    res.send('Hello World! all resto')
  }

export const getRestaurantById = (req: Request, res: Response) => {
    res.send(`hey this is the restaurant with id ${req.params.id}`)
  }