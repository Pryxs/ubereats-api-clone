import Joi from 'joi';

export const customerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    // isVerify: Joi.number().required(),
})
