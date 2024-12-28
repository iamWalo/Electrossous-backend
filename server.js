import express from 'express';
import cors from 'cors';
const app = express();
import router from './routes/productRout.js';
import path from 'path';

import 'dotenv/config';

const port = process.env.PORT;

import { connectDB } from './config/dataBase.js'

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/electrosouss', router);

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log('server listening on port ' + port);
})