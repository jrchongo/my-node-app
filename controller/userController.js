import {errorResponseObject, serviceStatus} from '../constants/constants';
import {createUser} from '../services/userService';

export const addUser = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = req.body;
        console.log('req.body', req.body);

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
