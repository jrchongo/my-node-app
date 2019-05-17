import {errorResponseObject, serviceStatus} from '../constants/constants';
import {createUser, getUserList} from '../services/userService';

export const addUser = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = req.body;
        let responseFromService = await createUser(data);

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

export const fetchUserList = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            skip: req.query.skip,
            limit: req.query.limit
        };
        let responseFromService = await getUserList(data);

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

