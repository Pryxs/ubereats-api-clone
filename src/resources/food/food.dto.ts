import Joi from 'joi';

export const foodSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string(),
    foodType: Joi.string().required(),
    readyTime: Joi.number().required(),
    price: Joi.number().required(),
    rating: Joi.number(),
    images: Joi.array().items(Joi.string()),
})
