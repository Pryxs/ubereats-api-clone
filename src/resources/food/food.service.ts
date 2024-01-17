import { FoodModel, IFood } from "./food.model";

export const FoodService = () => {
    const getById = async (id: string): Promise<IFood | null> => await FoodModel.findOne({ _id: id });

    const create = async (newFood: IFood): Promise<IFood> => {
        const food = new FoodModel(newFood)
        return await food.save();
    }

    const update = async (id: string, data: IFood): Promise<IFood | null> => {
        const food = await FoodModel.findByIdAndUpdate(id, data);
        return food;
    }

    return {
        getById,
        create,
        update,
    }
}
