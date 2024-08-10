import express from "express";
import { Problem } from "../models/Problem.js";

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { id, title, description, testCases, difficulty } = request.body;

        // Validate required fields
        if (!id || !title || !description || !difficulty === undefined) {
            return response.status(400).send({
                message: 'Send all required fields: id, title, description, difficulty, category, order'
            });
        }

        // Create a new problem entry
        const newProblem = {
            id: request.body.id,
            title: request.body.title,
            description: request.body.description,
            testCases: request.body.testCases || [], // Set an empty array if testCases are not provided
            difficulty: request.body.difficulty,
         };

        // Save to database
        const problem = await Problem.create(newProblem);

        return response.status(201).send(problem);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        // Fetch all problems from the database
        const problems = await Problem.find({});

        // Return the list of problems in JSON format
        return response.status(200).json({
            count: problems.length,
            data: problems,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
    try {
        // Fetch all problems from the database
        const { id } = request.params;
        const problem = await Problem.findById(id);

        // Return the list of problems in JSON format
        return response.status(200).json({
            data: problem,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;