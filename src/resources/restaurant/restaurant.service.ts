import { RestaurantModel, IRestaurant } from "./restaurant.model";
import { encrypt } from "../../utils/crypto";

export const RestaurantsService = () => {

    const getAllRestaurants = async (): Promise<IRestaurant[]> => await RestaurantModel.find();

    const getRestaurantById = async (id: string): Promise<IRestaurant | null> => await RestaurantModel.findOne({ _id: id });

    const createRestaurant = async (newRestaurant: IRestaurant): Promise<IRestaurant> => {
        const hasedPwd = await encrypt(newRestaurant.password)
        const restaurant = new RestaurantModel({ ...newRestaurant, password: hasedPwd })
        return await restaurant.save();
    }

    const updateRestaurant = async (id: string, data: IRestaurant): Promise<IRestaurant | null> => {
        const restaurant = await RestaurantModel.findByIdAndUpdate(id, data);
        return restaurant;
    }

    return {
        getAllRestaurants,
        getRestaurantById,
        createRestaurant,
        updateRestaurant,
    }
}
