import express from "express";
import CompileRoute from './routes/CompileRoute.js';
import cors from "cors";
import mongoose from "mongoose";
import { mongoDBURL} from "./config.js";
import { PORT } from "./config.js";

const app = express();

//middleware
app.use(express.json());

app.use(cors());

app.use('/compile', CompileRoute);

app.listen(3001, () => console.log("Server running on port 3001"));

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