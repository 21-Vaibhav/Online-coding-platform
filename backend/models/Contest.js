import mongoose from 'mongoose';

const ContestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    problems: [
        {
            id: String,
        },
    ],
    leaderboard: [{
        userID: {
            type:String,
        },
        score: {
            type: Number,
            default: 0,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }],
});

export const Contest = mongoose.model('Contest', ContestSchema);