import { RestaurantModel, IRestaurant } from '../restaurant/restaurant.model';


export const AuthService = () => {

    const getRestaurantByMail = async (mail: string): Promise<IRestaurant | null> => await RestaurantModel.findOne({ email: mail });

    return { getRestaurantByMail };
} 