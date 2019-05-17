import Joi from 'joi';
import {controllerStatus} from '../constants/constants'
let responseObj = {};

export const validateBody = (schema) => {
    return (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            let errorDetail = result.error.details.map((value) => {
               return {
                   error: value.message,
                   path: value.path
               }
            });
            responseObj.status = 400;
            responseObj.message = controllerStatus.BAD_REQUEST;
            responseObj.body = errorDetail;
            return res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    }
};

export const validateQueryParams = (schema) => {
    return (req, res, next) => {
        const result = Joi.validate(req.query, schema);
        if (result.error) {
            let errorDetail = result.error.details.map((value) => {
                return {
                    error: value.message,
                    path: value.path
                }
            });
            responseObj.status = 400;
            responseObj.message = controllerStatus.BAD_REQUEST;
            responseObj.body = errorDetail;
            return res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    }
};