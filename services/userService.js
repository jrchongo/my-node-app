import {insertData} from '../database/crudRepository';
import {databaseStatus, errorResponseObject, serviceStatus} from '../constants/constants';
const User = require('../models/db/userModel');

export const createUser = async (data) => {
    let responseObj = {};

    try {
        const user = new User({
            name: data.name,
            password: data.password,
            phone: data.phone
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
