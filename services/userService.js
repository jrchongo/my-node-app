import mongoose from 'mongoose'
import {insertData, find, findOneAndUpdate, deleteOne} from '../database/crudRepository';
import {databaseStatus, errorResponseObject, serviceStatus} from '../constants/constants';
import * as constants from "../constants/constants";
import {sign} from 'jsonwebtoken';

const User = require('../models/db/userModel');

export const addUser = async (serviceData) => {
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


export const getUserList = async (serviceData) => {
    let responseObj = {};

    try {
        let data = {
            query: {},
            model: User,
            excludeFields: '-__v'
        };

        if (serviceData.skip && serviceData.limit) {
            data.pagination = {
                skip: parseInt(serviceData.skip),
                limit: parseInt(serviceData.limit)
            }
        } else {
            data.pagination = {}
        }

        let responseFromDatabase = await find(data);

        switch (responseFromDatabase.status) {
            case databaseStatus.ENTITY_FETCHED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY;
                break;
            default:
                responseObj = errorResponseObject;
                break;
        }
        return responseObj;

    } catch (err) {
        console.log('Something went wrong: Service: get user list: ', err);
        return responseObj = errorResponseObject;
    }
};

export const getUserDetail = async (serviceData) => {
    let responseObj = {};

    try {
        console.log(mongoose.Types.ObjectId(serviceData.userId));
        let data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            excludeFields: ''
        };

        let responseFromDatabase = await find(data);
        switch (responseFromDatabase.status) {
            case databaseStatus.ENTITY_FETCHED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = serviceStatus.USER_FETCHED_SUCCESSFULLY;
                break;
            default:
                responseObj = errorResponseObject;
                break;
        }
        return responseObj;

    } catch (err) {
        console.log('Something went wrong: Service: get user detail: ', err);
        return responseObj = errorResponseObject;
    }
};

export const updateUserDetail = async (serviceData) => {
    let responseObj = {};

    try {
        console.log(mongoose.Types.ObjectId(serviceData.userId));
        let data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            excludeFields: '',
            updateQuery: {}
        };

        if (serviceData.name) {
            data.updateQuery.name = serviceData.name
        }
        if (serviceData.password) {
            data.updateQuery.password = serviceData.password
        }
        git
        if (serviceData.phone) {
            data.updateQuery.phone = serviceData.phone
        }

        let responseFromDatabase = await findOneAndUpdate(data);
        switch (responseFromDatabase.status) {
            case databaseStatus.ENTITY_MODIFIED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = serviceStatus.USER_UPDATED_SUCCESSFULLY;
                break;
            default:
                responseObj = errorResponseObject;
                break;
        }
        return responseObj;

    } catch (err) {
        console.log('Something went wrong: Service: update user detail: ', err);
        return responseObj = errorResponseObject;
    }
};

export const deleteUser = async (serviceData) => {
    let responseObj = {};

    try {
        console.log(mongoose.Types.ObjectId(serviceData.userId));
        let data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User
        };

        let responseFromDatabase = await deleteOne(data);
        switch (responseFromDatabase.status) {
            case databaseStatus.ENTITY_DELETED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = serviceStatus.USER_DELETED_SUCCESSFULLY;
                break;
            default:
                responseObj = errorResponseObject;
                break;
        }
        return responseObj;

    } catch (err) {
        console.log('Something went wrong: Service: delete user: ', err);
        return responseObj = errorResponseObject;
    }
};

export const authenticateUser = async (serviceData) => {
    let responseObj = {};

    try {
        let data = {
            query: {
                name: serviceData.name,
                password: serviceData.password
            },
            model: User
        };

        let responseFromDatabase = await find(data);
        if(responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED && responseFromDatabase.result.length > 0) {
            const token = sign({userTYpe: 'admin'}, process.env.SECRET_KEY);
            responseObj.status = constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY;
            responseObj.body = {
                'token': token
            }
        } else {
            responseObj.status = constants.serviceStatus.INVALID_CREDENTIALS;
            responseObj.body = {}
        }

        return responseObj;

    } catch (err) {
        console.log('Something went wrong: Service: authenticate user: ', err);
        return responseObj = errorResponseObject;
    }
};