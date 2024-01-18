import { RestaurantModel, IRestaurant } from "./restaurant.model";
import { FoodModel, IFood } from '../food/food.model';
import { encrypt } from "../../utils/crypto";

export const RestaurantsService = () => {

    const getAllRestaurants = async (): Promise<IRestaurant[]> => await RestaurantModel.find()

    const getRestaurantById = async (id: string): Promise<IRestaurant | null> => await RestaurantModel.findOne({ _id: id });

    const createRestaurant = async (newRestaurant: IRestaurant): Promise<IRestaurant> => {
        const hashedPwd = await encrypt(newRestaurant.password)
        const restaurant = new RestaurantModel({ ...newRestaurant, password: hashedPwd })
        return await restaurant.save();
    }

    const updateRestaurant = async (id: string, data: IRestaurant): Promise<IRestaurant | null> => {
        const restaurant = await RestaurantModel.findByIdAndUpdate(id, data);
        return restaurant;
    }

    type PopulatedRestaurant = IRestaurant & { foods: IFood[]}

    const getFoodByRestaurant = async (id: string): Promise<IFood[]> => {
        const restaurant = await RestaurantModel.findOne({ _id: id }).populate<Pick<PopulatedRestaurant, 'foods'>>('foods').exec();

        if(!restaurant) throw new Error();

        return restaurant.foods;
    }

    const getRestaurantFoods = async (key: string, value: string): Promise<{name: string, foods: IFood[]}[]> => {
        const restaurants = await RestaurantModel.find({[key] : value }).populate<Pick<PopulatedRestaurant, 'foods'>>('foods').exec();

        if(!restaurants) throw new Error();

        return  restaurants.filter(r => r.serviceAvailable).sort((a, b) => b.rating - a.rating).map(restaurant => ({ name: restaurant.name, rating: restaurant.rating, foods: restaurant.foods}))
    }

    return {
        getAllRestaurants,
        getRestaurantById,
        createRestaurant,
        updateRestaurant,
        getFoodByRestaurant,
        getRestaurantFoods
    }
}
