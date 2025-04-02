import mongoose from "mongoose";
import postMessage from "../models/postMessage.js"

export const getPosts = async (req, res)=>{
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({msg : error.message});
    }

}
export const createPost = async (req, res)=>{
    // const data = req.body;
    const { title, message,creator, tags , selectedFile} = req.body;
// const transaction = await TransactionModel.create({name, description, date} )
    // newPost is an object created from the postMessage model, and it represents a single document that will be saved to the MongoDB collection defined by the postMessage model.
    // console.log(data)
    // const newPost = new postMessage(data);
    try {
        // await newPost.save();
        const newPost = await postMessage.create({title, message,creator, tags , selectedFile} )
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({msg : error.message})
        
    }
}
export const updatePost = async (req, res)=>{
    const {id :_id} = req.params;
    const post = req.body
if(!mongoose.Types.ObjectId.isValid(_id)){
return res.status(404).send("no post with this id")
}
try {
     const updatedPost = await postMessage.findByIdAndUpdate(_id, post)
     res.json(updatedPost)
} catch (error) {
    res.send("something wrong please check your internet")
}
   
}

export const deletePost = async (req, res)=>{
    // const {id : _id } = req.params;
    const {id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("no post with this id")
        }
        try {
        const deletedPost =  await postMessage.findOneAndDelete({_id: id})
           if (!deletedPost) {
            return res.status(404).send("Post not found");
        }
        res.json({ message: "Post deleted successfully"});
        } catch (error) {
            res.status(500).send("Something went wrong, please check your internet");
        }
}
export const likePost = async(req, res)=>{
    const {id : _id} = req.params;
    if(!req.userId) return res.status(400).json({success: false, message: 'Unauthenticated user '})

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("no post with this id"); 
    }
    try {
        const post = await postMessage.findById(_id)
        const index = post.likes.findIndex(id => id === String(req.userId));

        if(index === -1){
            post.likes.push(req.userId);
        } else{
            post.likes = post.likes.filter((id) => id !== String(req.userId));  
        }

        const updatedLike = await postMessage.findByIdAndUpdate(_id, post , {new: true})
        res.json(updatedLike)
    } catch (error) {
         res.status(500).send("Something went wrong, please check your internet");
    }
}