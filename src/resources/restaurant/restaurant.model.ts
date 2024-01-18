import { Schema, model } from "mongoose";

export type IRestaurant = {
    name: string;
    ownerName: string;
    foodType: string[];
    postalCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: string[];
    rating: number;
    foods: string[];
}

const validateEmail = (email: string) => {
    const rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return rgx.test(email)
};

export const RestaurantSchema = new Schema<IRestaurant>({
    name: String,
    ownerName: String,
    foodType: [String],
    postalCode: String,
    address: String,
    phone: String,
    email: {
        type: String,
        validate: [validateEmail],
    },
    password: {
        type: String,
        select: false,
    },
    salt: String,
    serviceAvailable: Boolean,
    coverImages: [String],
    rating: Number,
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
});

export const RestaurantModel = model('Restaurant', RestaurantSchema);
