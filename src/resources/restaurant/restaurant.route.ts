import express, { Router } from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById } from "./restaurant.controller";
import { validator } from "../../middlewares/validator"
import { restaurantOwnerSchema } from './restaurant.dto'

const router: Router = express.Router();

router.route('')
    .get(getAllRestaurants)
    .post(validator(restaurantOwnerSchema), createRestaurant)
router.route('/:id').get(getRestaurantById)

export const RestaurantRouter = router;