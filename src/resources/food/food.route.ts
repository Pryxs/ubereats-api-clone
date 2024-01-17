import express, { Router } from "express";
import { createFood, getFoodById, updateFood } from "./food.controller";
import { validator } from "../../middlewares/validator"
import { foodSchema } from './food.dto'
import multer from "multer";
const upload = multer({ dest: 'uploads/' })


const router: Router = express.Router();

router.route('')
    .post(validator(foodSchema), createFood)

router.route('/:id').get(getFoodById).put(upload.array('images', 12), updateFood)

export const FoodRouter = router;
