import { Schema, model } from "mongoose";

export type IFood = {
    name: string;
    description: string;
    category: string;
    foodType:string;
    readyTime?: number;
    price: number;
    rating?: number;
    images?: string[],
}

export const FoodSchema = new Schema<IFood>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: String,
    foodType: {
        type: String,
        required: true
    },
    readyTime: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    rating: Number,
    images: [String]
});

export const FoodModel = model('Food', FoodSchema);
