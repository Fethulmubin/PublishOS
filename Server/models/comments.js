import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postMessage',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: String,
    comment: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;