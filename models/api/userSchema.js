import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    password: Joi.string().required()
});

