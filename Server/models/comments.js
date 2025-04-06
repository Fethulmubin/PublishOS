import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    postId: String,
    name: String,
    comment: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const commentModel = mongoose.model('commentMessage', commentSchema);

export default commentModel;