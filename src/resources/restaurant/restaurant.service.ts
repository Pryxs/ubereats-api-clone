import { RestaurantModel, IRestaurant } from "./restaurant.model";

export const RestaurantsService = () => {

    const getAllRestaurants = async (): Promise<IRestaurant[]> => await RestaurantModel.find();

    const getRestaurantById = async (id: string): Promise<IRestaurant | null> => await RestaurantModel.findOne({ _id: id });

    const createRestaurant = async (newRestaurant: IRestaurant): Promise<IRestaurant> => {
        const restaurant = new RestaurantModel(newRestaurant)
        return await restaurant.save();
    }

    return {
        getAllRestaurants,
        getRestaurantById,
        createRestaurant,
    }
}
