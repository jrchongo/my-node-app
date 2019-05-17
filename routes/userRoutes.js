import express from 'express';
import {addUser, fetchUserList} from '../controller/userController';
import {validateBody, validateQueryParams} from "../helper/joiSchemaValidation";
import {createUserSchema, getUserListQuerySchema} from "../models/api/userSchema";

export const getRouter = () => {
    const router = express.Router();
    router.post('/', validateBody(createUserSchema), addUser);
    router.get('/list', validateQueryParams(getUserListQuerySchema), fetchUserList);
    return router;
};
