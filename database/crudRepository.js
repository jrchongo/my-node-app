import mongoose from 'mongoose';
import {databaseStatus} from '../constants/constants';

export function createConnection() {
    return new Promise((resolve, reject) => {
        let responseObj = {};
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, (err) => {
            if (err) {
                responseObj.status = databaseStatus.DATABASE_ERROR;
                console.log("Error: ", JSON.stringify(responseObj));
                return reject(responseObj);
            }
            responseObj.status = databaseStatus.DATABASE_CONNECTED;
            console.log('Success: ', JSON.stringify(responseObj));
            return resolve(responseObj);
        });
    });
};

export const insertData = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.save().then((docs) => {
                resolve({
                    result: docs,
                    status: databaseStatus.ENTITY_CREATED
                });
            }).catch((err) => {
                data.model.save().then((docs) => {
                    reject({
                        error: err.message,
                        status: databaseStatus.DATABASE_ERROR
                    });
                });
            });
        } catch (err) {
            console.log('Something went wrong: CrudRepository: insert data ', err);
        }
    })
}
