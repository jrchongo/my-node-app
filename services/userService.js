import {insertData} from '../database/crudRepository';
import {databaseStatus, errorResponseObject, serviceStatus} from '../constants/constants';
const User = require('../models/db/userModel');

export const createUser = async (serviceData) => {
    let responseObj = {};

    try {
        const user = new User({
            name: serviceData.name,
            password: serviceData.password,
            phone: serviceData.phone
        });
        let data = {
            model: user
        };
        let responseFromDatabase = await insertData(data);

        switch (responseFromDatabase.status) {
            case databaseStatus.ENTITY_CREATED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = serviceStatus.USER_CREATED_SUCCESSFULLY;
                break;
            default:
                responseObj = errorResponseObject;
                break;
        }
        return responseObj;

    } catch (err) {
        console.log('Something went wrong: Service: create user: ', err);
        return responseObj = errorResponseObject;
    }
};
