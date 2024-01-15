import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import mongoConnection from "./utils/mongo";
import {RestaurantRouter} from "./resources/restaurant/restaurants.route";

dotenv.config();

const app: Express = express();

mongoConnection();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/', RestaurantRouter)
// app.use('/api/products', ProductRouter)

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!')
// })


const port: string = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});