import express from 'express';
import {addUser} from '../controller/userController';

export const getRouter = () => {
    const router = express.Router();
    router.post('/', addUser);
    return router;
};
