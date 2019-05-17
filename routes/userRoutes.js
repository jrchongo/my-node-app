import express from 'express';
import {addUser} from '../controller/userController';
import {validateBody} from "../helper/joiSchemaValidation";
import {createUserSchema} from "../models/api/userSchema";

export const getRouter = () => {
    const router = express.Router();
    router.post('/', validateBody(createUserSchema), addUser);
    return router;
};
