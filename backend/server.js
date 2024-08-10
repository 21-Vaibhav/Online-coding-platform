import express from "express";
//import routes
import CompileRoute from './routes/CompileRoute.js';
import ProblemListRoute from "./routes/ProblemListRoute.js";

import cors from "cors";
import mongoose from "mongoose";
import { mongoDBURL} from "./config.js";
import { PORT } from "./config.js";


const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/compile', CompileRoute);
app.use('/problemList', ProblemListRoute);
app.use('/problem', ProblemRoute);


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