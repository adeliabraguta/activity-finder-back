import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    activity: {
        type: String,
        required: true
    },
    accessibility: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    participants: {
        type: Number,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {versionKey: false})

export default mongoose.model('activities', activitySchema)
