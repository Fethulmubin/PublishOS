import mongoose from "mongoose";
// import commentModel from "../models/comments.js";
import Comment from "../models/comments.js";
import postMessage from "../models/postMessage.js";
import userModel from "../models/users.js";

//get comments for a post
export const getComments = async (req, res) => {
    const {postId} = req.params;
    const id = req.userId;
    if(!mongoose.Types.ObjectId.isValid(postId)){
        return res.status(404).json({success: false , message:"no post with this id"})
    }
    if(!id){
        return res.status(404).json({success : false , message: "Please login to see the comments"})
    }
    try {
        const comments = await Comment.find({ postId: postId }).populate('userId', 'name');
        res.status(200).json({success: true , message:"Comments fetched successfully", comments: comments});
    } catch (error) {
        res.status(500).json({success: false , message:"something went wrong"})
    }

}
// add comment to a post
export const addComment = async (req, res) => {

    const {postId} = req.params;
    const comment = req.body.comment;
    const id = req.userId;

    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    const { name } = user;
    try {
        const newComment = new Comment({
            postId: postId,
            userId: id,
            name: name,
            comment: comment,
        });
        const savedComment = await newComment.save();
        const updatedPost  = await postMessage.findByIdAndUpdate(
            postId,
            { $push: { comments: savedComment._id } }
        );
        res.status(200).json({success: true , message:"Comment added successfully", comment: savedComment});
    } catch (error) {
        res.status(500).json({success: false , message:"something went wrong"})
    }
   

}

// update comment from a post
export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No comment with this id" });
    }
    try {
        const commentToUpdate = await Comment.findById(id);
        if(userId !== commentToUpdate.userId.toString()){
            return res.status(401).json({ success: false, message: "You can only update your own comments" });
        }
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { comment: comment },
            { new: true }
        );
        res.status(200).json({ success: true, message: "Comment updated successfully", comment: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }

}

//deleting the comment
export const deleteComment = async (req, res) => {
    //comment id
    const { id } = req.params;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No comment with this id" });
    }
    try {
        const commentToDelete = await Comment.findById(id);
        if (userId !== commentToDelete.userId.toString()) {
            return res.status(401).json({ success: false, message: "You can only delete your own comments" });
        }
        const deletedComment = await Comment.findByIdAndDelete(id);
        const postId = deletedComment.postId;
        await postMessage.findByIdAndUpdate(
            postId,
            { $pull: { comments: id } }
        );
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        
    }
}