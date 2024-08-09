const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Problem', ProblemSchema);