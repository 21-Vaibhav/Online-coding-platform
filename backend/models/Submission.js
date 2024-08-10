import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contestID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true,
    },
    problemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    submissionTime: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Accepted', 'Wrong Answer', 'Not Submitted','Compilation Error', 'Runtime Error'],
        default: 'Not Submitted',
    },
    score: {
        type: Number,
        default: 0,
    },
});

export const Submission = mongoose.model('Submission', SubmissionSchema);
