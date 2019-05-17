import {errorResponseObject, serviceStatus} from '../constants/constants';
import * as service from '../services/userService';

export const addUser = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = req.body;
        let responseFromService = await service.addUser(data);

        switch (responseFromService.status) {
            case serviceStatus.USER_CREATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = serviceStatus.USER_CREATED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;

            default:
                responseObj = errorResponseObject;
                break;
        }
        return res.status(responseObj.status).send(responseObj)
    } catch (err) {
        console.log('Create user error: ', err);
        responseObj = errorResponseObject;
        return res.status(responseObj.status).send(responseObj);
    }
};

export const getUserList = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            skip: req.query.skip,
            limit: req.query.limit
        };
        let responseFromService = await service.getUserList(data);

        switch (responseFromService.status) {
            case serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;

            default:
                responseObj = errorResponseObject;
                break;
        }
        return res.status(responseObj.status).send(responseObj)
    } catch (err) {
        console.log('Get user list error ', err);
        responseObj = errorResponseObject;
        return res.status(responseObj.status).send(responseObj);
    }
};

export const getUserDetail = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            userId: req.params.userId
        };
        let responseFromService = await service.getUserDetail(data);

        switch (responseFromService.status) {
            case serviceStatus.USER_FETCHED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = serviceStatus.USER_FETCHED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;

            default:
                responseObj = errorResponseObject;
                break;
        }
        return res.status(responseObj.status).send(responseObj)
    } catch (err) {
        console.log('Get user detail error ', err);
        responseObj = errorResponseObject;
        return res.status(responseObj.status).send(responseObj);
    }
};

export const updateUserDetail = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            userId: req.params.userId,
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password
        };
        let responseFromService = await service.updateUserDetail(data);

        switch (responseFromService.status) {
            case serviceStatus.USER_UPDATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = serviceStatus.USER_UPDATED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;

            default:
                responseObj = errorResponseObject;
                break;
        }
        return res.status(responseObj.status).send(responseObj)
    } catch (err) {
        console.log('Update user detail error ', err);
        responseObj = errorResponseObject;
        return res.status(responseObj.status).send(responseObj);
    }
};
