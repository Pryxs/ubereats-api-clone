import express, { Router } from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, getRestaurantFood, updateRestaurantPorfile } from "./restaurant.controller";
import { validator } from "../../middlewares/validator"
import { authentificator } from "../../middlewares/authentificator"
import { restaurantOwnerSchema } from './restaurant.dto'

const router: Router = express.Router();

router.route('')
    .get(getAllRestaurants)
    .post(validator(restaurantOwnerSchema), createRestaurant)

router.route('/:id').get(getRestaurantById)
//.put(authentificator({mustBeOwner: true}), updateRestaurant)
router.route('/:id/food').get(getRestaurantFood)
router.route('/profile').put(authentificator({}), updateRestaurantPorfile)


// router.route('/foods')
//     .get(getMenu)
//     .post(createFood)
//     .delete(deleteFood)
//     .put(updateFood)
    
// router.route('/foods/:id').get(getFoodById)



export const RestaurantRouter = router;
