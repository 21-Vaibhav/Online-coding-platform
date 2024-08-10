import express from "express";
import { Contest } from "../models/Contest.js";

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { name, description, startTime, endTime, problems } = request.body;

        // Validate required fields
        if (!name || !startTime || !endTime) {
            return response.status(400).send({
                message: 'Send all required fields: name, startTime, endTime'
            });
        }

        // Create a new contest entry
        const newContest = {
            name: request.body.name,
            description: request.body.description || "", // Default to empty string if not provided
            startTime: request.body.startTime,
            endTime: request.body.endTime,
            problems: request.body.problems || [], // Set an empty array if problems are not provided
            leaderboard: [], // Initialize leaderboard as an empty array
        };

        // Save to database
        const contest = await Contest.create(newContest);

        return response.status(201).send(contest);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        // Fetch all contests from the database
        const contests = await Contest.find({});

        // Return the list of contests in JSON format
        return response.status(200).json({
            count: contests.length,
            data: contests,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;