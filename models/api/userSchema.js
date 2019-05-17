import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    password: Joi.string().required()
});

export const getUserListQuerySchema = Joi.object().keys({
    skip: Joi.string().optional(),
    limit: Joi.string().optional()
}).and('skip', 'limit');

