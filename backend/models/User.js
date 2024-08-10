import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contestsParticipated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest',
    }],
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
    }],
});

export const User = mongoose.model('User', UserSchema);