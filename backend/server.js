import express, { request } from 'express';
import { PORT ,mongoDBURL } from './config.js';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';

//initailaize express app
const app = express();

//middleware
app.use(express.json());

app.use(cors());


mongoose
    .connect(mongoDBURL)
    .then(() => {
        
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
          });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });