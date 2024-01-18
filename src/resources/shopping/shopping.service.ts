import { FoodModel, IFood } from '../food/food.model'
import { RestaurantModel, IRestaurant } from '../restaurant/restaurant.model';
import { RestaurantsService } from '../restaurant/restaurant.service'

const restaurantService = RestaurantsService();

export const ShoppingService = () => {
    const getTopRestaurantsFromPostalCode = async (postalCode: string): Promise<IRestaurant[]> => {
        return await RestaurantModel.aggregate([
            {
                $match: {

                    // rating: { $gte: 4 }
                }
            },
            {
                $sort: { rating: -1 }
            },
            {
                $limit: 5
            }
        ])
    }

    const getFoodsReadyUnder30Min = async (postalCode: string) => {
        const restaurants = await RestaurantModel.find({"postalCode" : postalCode }).populate<Pick<IRestaurant & { foods: IFood[]}, 'foods'>>({path: 'foods', match: { 'readyTime': { $lt: 30 } } }).exec();
        return restaurants.map(restaurant => {
            if(restaurant.foods.length) return restaurant;

            return undefined
        }).filter(e => e)  
    }

    // const getSearchResults = async (searchQuery) => {
    //     await FoodModel.aggregate([
    //         {
    //             $match: {
    //                 food: searchQuery,
    //             }
    //         },
    //         {
    //             $sort: { rating: -1 }
    //         },
    //         {
    //             $limit: 10
    //         }
    //     ])
    // }


    return {
        getTopRestaurantsFromPostalCode,
        getFoodsReadyUnder30Min,
        // getSearchResults,
    }
}