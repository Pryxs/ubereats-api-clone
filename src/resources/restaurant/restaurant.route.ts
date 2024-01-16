import express, { Router } from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant } from "./restaurant.controller";
import { validator } from "../../middlewares/validator"
import { authentificator } from "../../middlewares/authentificator"
import { restaurantOwnerSchema } from './restaurant.dto'

const router: Router = express.Router();

router.route('')
    .get(getAllRestaurants)
    .post(validator(restaurantOwnerSchema), createRestaurant)
router.route('/:id').get(getRestaurantById).put(authentificator(), updateRestaurant)



export const RestaurantRouter = router;
