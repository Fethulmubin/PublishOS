import mongoose from "mongoose";
import postMessage from "../models/postMessage.js"
import userModel from "../models/users.js";

export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const total = await postMessage.countDocuments();
        const postMessages = await postMessage.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const hasMore = skip + limit < total;
        res.status(200).json({ data: postMessages, currentPage: page, totalPages: Math.ceil(total / limit), hasMore });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }

}
export const createPost = async (req, res) => {
    const posterId = req.userId;    
    const { title, message, creator, tags, selectedFile } = req.body;

    try {
        // await newPost.save();
        const newPost = await postMessage.create({ title, message, creator, tags, selectedFile, posterId })
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({ msg: error.message })

    }
}
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("no post with this id")
    }
    try {
        const postToUpdate = await postMessage.findById(_id);
        if (userId !== postToUpdate.posterId.toString()) {
            return res.status(401).json({ success: false, message: "You can only update your own posts" });
        }
        const updatedPost = await postMessage.findByIdAndUpdate(_id, post)
        res.json(updatedPost)
    } catch (error) {
        res.send("something wrong please check your internet")
    }

}

export const deletePost = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("no post with this id")
    }
    try {
        const postToDelete = await postMessage.findById(id);
        if (userId !== postToDelete.posterId.toString()) {
            return res.status(401).json({ success: false, message: "You can only delete your own posts" });
        }
        const deletedPost = await postMessage.findOneAndDelete({ _id: id })
        if (!deletedPost) {
            return res.status(404).send("Post not found");
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).send("Something went wrong, please check your internet");
    }
}
export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    const id = req.userId;
    if (!id) {
        return res.status(400).json({ success: false, message: 'Unauthenticated user' });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with this ID");
    }

    try {
            const post = await postMessage.findById(_id);
        
            const hasLiked = post.likes.includes(id);
        
            const updatedPost = await postMessage.findByIdAndUpdate(
                _id,
                hasLiked
                    ? { $pull: { likes: id } }
                    : { $addToSet: { likes: id } },
                { new: true }
            );
        
            res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong, please check your internet");
    }
};
