import express from "express";
import { ProblemList } from "../models/ProblemList.js";

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { id, title, difficulty, category, order } = request.body;

        // Validate required fields
        if (!id || !title || !difficulty || !category || order === undefined) {
            return response.status(400).send({
                message: 'Send all required fields: id, title, difficulty, category, order'
            });
        }

        // Create a new problem entry
        const newProblem = {
            id:request.body.id,
            title:request.body.title,
            difficulty:request.body.difficulty,
            category:request.body.category,
            order:request.body.order
        };

        // Save to database
        const problem = await ProblemList.create(newProblem);

        return response.status(201).send(problem);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        // Fetch all problems from the database
        const problems = await ProblemList.find({});

        // Return the list of problems in JSON format
        return response.status(200).json({
            count:problems.length,
            data:problems,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;