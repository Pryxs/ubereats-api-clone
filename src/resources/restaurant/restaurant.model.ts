import { Schema, model } from "mongoose";

export type IRestaurant = {
    name: string;
    ownerName: string;
    foodType: string[];
    postalcode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: string[];
    rating: number;
    foods: string;
}

export const RestaurantSchema = new Schema<IRestaurant>({
    name: String,
    ownerName: String,
    foodType: [String],
    postalcode: String,
    address: String,
    phone: String,
    email: String,
    password: String,
    salt: String,
    serviceAvailable: Boolean,
    coverImages: [String],
    rating: Number,
    foods: String,
});

export const RestaurantModel = model('Restaurant', RestaurantSchema);
