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

export const getUserDetailPathParamSchema = Joi.object().keys({
    userId: Joi.string().required()
});

export const updateUserDetailPathParamSchema = Joi.object().keys({
    userId: Joi.strict().required()
});

export const updateUserSchema = Joi.object().keys({
    name: Joi.string().optional(),
    phone: Joi.number().optional(),
    password: Joi.string().optional()
});


