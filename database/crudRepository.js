import mongoose from 'mongoose';
import {databaseStatus} from '../constants/constants';

export function createConnection() {
    return new Promise((resolve, reject) => {
        let responseObj = {};
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, (err) => {
            if (err) {
                responseObj.status = databaseStatus.DATABASE_ERROR;
                console.log("Error: ", JSON.stringify(err));
                return reject(responseObj);
            }
            responseObj.status = databaseStatus.DATABASE_CONNECTED;
            console.log('Success: ', JSON.stringify(responseObj));
            return resolve(responseObj);
        });
    });
}

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
};

export const find = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.find(data.query, data.excludeFields, data.pagination).then((docs) => {
                resolve({
                    result: docs,
                    status: databaseStatus.ENTITY_FETCHED
                });
            }).catch(err => {
                reject({
                    error: err.message,
                    status: databaseStatus.DATABASE_ERROR
                });
            });
        } catch (err) {
            console.log('Something went wrong: CrudRepository: find ', err);
        }
    })
};


export const findOneAndUpdate = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.findOneAndUpdate(data.findQuery, data.updateQuery).then((docs) => {
                resolve({
                    result: docs,
                    status: databaseStatus.ENTITY_MODIFIED
                });
            }).catch(err => {
                reject({
                    error: err.message,
                    status: databaseStatus.DATABASE_ERROR
                });
            });
        } catch (err) {
            console.log('Something went wrong: CrudRepository: findOneAndUpdate ', err);
        }
    })
};

export const deleteOne = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.deleteOne(data.findQuery).then((docs) => {
                resolve({
                    result: docs,
                    status: databaseStatus.ENTITY_DELETED
                });
            }).catch(err => {
                reject({
                    error: err.message,
                    status: databaseStatus.DATABASE_ERROR
                });
            });
        } catch (err) {
            console.log('Something went wrong: CrudRepository: deleteOne ', err);
        }
    })
};
