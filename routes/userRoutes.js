import express from 'express';
import {
    addUser,
    getUserList,
    getUserDetail,
    updateUserDetail,
    deleteUser,
    authenticateUser
} from '../controller/userController';
import {
    validateBody,
    validateQueryParams,
    validatePathParams
} from "../helper/joiSchemaValidation";
import {
    createUserSchema,
    getUserDetailPathParamSchema,
    getUserListQuerySchema,
    updateUserDetailPathParamSchema,
    updateUserSchema,
    deleteUserPathParamSchema,
    authenticateUserSchema
} from "../models/api/userSchema";

export const getRouter = () => {
    const router = express.Router();
    router.post('/authenticate', validateBody(authenticateUserSchema), authenticateUser);
    router.post('/', validateBody(createUserSchema), addUser);
    router.get('/list', validateQueryParams(getUserListQuerySchema), getUserList);
    router.get('/detail/:userId', validatePathParams(getUserDetailPathParamSchema), getUserDetail);
    router.put('/update/:userId', validatePathParams(updateUserDetailPathParamSchema), validateBody(updateUserSchema), updateUserDetail);
    router.delete('/remove/:userId', validatePathParams(deleteUserPathParamSchema), deleteUser);
    return router;
};
