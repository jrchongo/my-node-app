import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from 'dotenv';
import {createConnection} from './database/crudRepository';
import {getRouter} from './routes/userRoutes';

const app = express();
config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
createConnection();

app.use('/api/v1/user', getRouter());
app.use('/', (req, res) => {
    res.send('<h1> Hello from node</h1>');
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Api is listening on port: ${port}`);
});
