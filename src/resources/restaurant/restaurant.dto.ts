import Joi from 'joi';

export const restaurantOwnerSchema = Joi.object({
    name: Joi.string()
        .required(),

    ownerName: Joi.string()
        .required(),

    foodType: Joi.string()
        .required(),

    postalCode: Joi.string()
        .required(),

    address: Joi.string()
        .required(),

    phone: Joi.string()
        .required(),

    email: Joi.string()
        .required(),

    password: Joi.string()
        .required(),
})
