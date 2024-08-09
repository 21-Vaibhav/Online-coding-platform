import express from "express";
import CompileRoute from './routes/CompileRoute.js';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/compile', CompileRoute);

app.listen(3001, () => console.log("Server running on port 3001"));
