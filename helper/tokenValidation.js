import {verify} from 'jsonwebtoken';
import {controllerStatus} from '../constants/constants';
let responseObj = {};

export function validateToken() {
    return (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        const token = bearerHeader.split(' ')[1];
        if(token) {
            verify(token, process.env.SECRET_KEY, (err, authData) => {
                if(err) {
                    responseObj.message = controllerStatus.TOKEN_INVALID;
                    responseObj.status = 400;
                    responseObj.body = {};

                    return res.status(responseObj.status).send(responseObj);
                } else {
                    next();
                }
            });
        } else {
            responseObj.message = controllerStatus.TOKEN_MISSING;
            responseObj.status = 400;
            responseObj.body = {};

            return res.status(responseObj.status).send(responseObj);
        }
    }
};