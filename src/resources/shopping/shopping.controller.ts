import { Request, Response } from 'express';
import { ShoppingService } from './shopping.service';
import { RestaurantsService } from '../restaurant/restaurant.service'

const shoppingService = ShoppingService();
const restaurantService = RestaurantsService();

export const getAvailableProducts = async (req: Request, res: Response) => {
    try {
        const availableFood = await restaurantService.getRestaurantFoods("postalCode", req.params.postalCode);
        res.status(200).send({ ok: true, data: availableFood})
        
    } catch (error) {
        res.status(500).send({ ok: false, error })
    }
}

export const getTopRestaurants = async (req: Request, res: Response) => {
    try {
        const topRestaurants = await shoppingService.getTopRestaurantsFromPostalCode(req.params.postalCode);
        res.status(200).send({ ok: true, data: topRestaurants})
        
    } catch (error) {
        res.status(500).send({ ok: false, error })
    }
}

export const getFoodsIn30Min = async (req: Request, res: Response) => {
    try {
        const foodsIn30Min = await shoppingService.getFoodsReadyUnder30Min(req.params.postalCode);
        res.send({ ok: true, data: foodsIn30Min})
        
    } catch (error) {
        res.status(500).send({ ok: false, error })
    }
}

// export const getSearchResults = async (req: Request, res: Response) => {
// try {
//     const { search } = req.params;
//     const searchResults = await shoppingService.getSearchResults(search);
//     res.status(201).send({ ok: true, data: searchResults})
// } catch (error) {
//     res.status(500).send({ ok: false, error })

// }
// }

