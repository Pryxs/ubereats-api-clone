import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import mongoConnection from "./utils/mongo";
import { RestaurantRouter } from "./resources/restaurant/restaurant.route";
import { AuthRouter } from "./resources/authentification/auth.route";
import { FoodRouter }from "./resources/food/food.route";
import { ShoppingRouter } from "./resources/shopping/shopping.route";
import { CustomerRouter } from "./resources/customer/customer.route";

dotenv.config();

const app: Express = express();

mongoConnection();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/v1/login', AuthRouter)
app.use('/api/v1/restaurant', RestaurantRouter)
app.use('/api/v1/food', FoodRouter)
app.use('/api/v1/shopping', ShoppingRouter)
app.use('/api/v1/customer', CustomerRouter)


app.use('*', (req: Request, res: Response) => {
    res.status(404).send({ ok: false, message: "Are you lost ?" })
})

const port: string = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});