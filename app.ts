import express from 'express';
import dotenv from 'dotenv';

dotenv.load();

const app: express.Application = express();

app.use(express.json());

app.listen(3000, () => {

});
