import mongoose from 'mongoose';

const ProblemListSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    category: {
        type: String,
    },
	order: {
        type: Number,
        required: true,
    },
});

export const ProblemList = mongoose.model('ProbleList', ProblemListSchema);