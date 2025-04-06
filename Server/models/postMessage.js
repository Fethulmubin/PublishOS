import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likes : {
        type : [String],
        default : []
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    },
    createdAt:{
        type : Date,
        default : new Date()
    }
})

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;