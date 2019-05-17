import express from 'express';
import {addUser, fetchUserList, fetchUserDetail} from '../controller/userController';
import {
    validateBody,
    validateQueryParams,
    validatePathParams
} from "../helper/joiSchemaValidation";
import {createUserSchema, getUserDetailPathParamSchema, getUserListQuerySchema} from "../models/api/userSchema";

export const getRouter = () => {
    const router = express.Router();
    router.post('/', validateBody(createUserSchema), addUser);
    router.get('/list', validateQueryParams(getUserListQuerySchema), fetchUserList);
    router.get('/detail/:userId', validatePathParams(getUserDetailPathParamSchema), fetchUserDetail);
    return router;
};
