import { createTextSpanFromBounds } from "typescript"
import express, { Express, Request, Response, Router } from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById } from "./restaurants.controller";


// getAll => controller
// controllr => appel service dans try catch et renvoie la reponse en status 200 ou error
// service => recupère la data en database, hash le mdp pour la route post, throw error si user not createTextSpanFromBounds, retourne data


// const Restaurant = require('./restaurants.model');

const router: Router = express.Router();
 
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/restaurants', createRestaurant);

export const RestaurantRouter = router; 


// router.route('').get(getAll).post(create);