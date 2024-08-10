import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    testCases: [
        {
            input: String,
            output: String,
        },
    ],
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
});

export const Problem = mongoose.model('Problem', ProblemSchema);