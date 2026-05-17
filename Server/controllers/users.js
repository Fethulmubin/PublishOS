import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import useModel from '../models/users.js';
// import mongoose from 'mongoose';
import userModel from '../models/users.js';
import dotenv from 'dotenv';
dotenv.config();


const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) return res.status(404).json({ success: false, message: "User doesn't exist." });
        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid credentials." });
        // Generate token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, result: existingUser, token });
    } catch (error) {
        console.error('Signin error:', error.message);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
}
const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    console.log(firstName, lastName, email, password, confirmPassword);
    try {
        const existedUser = await userModel.findOne({ email });
        if (existedUser) return res.status(400).json({ success: false, message: "User already exists." });
    
        if (password.length < 8) return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords don't match." });
    
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await userModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
        res.status(200).json({ success: true, result: newUser, token });
    
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({success: false, message: "Something went wrong." });
    }
}


const signupWithGoogleCheck = async(id, email, name, password) => {
    try {
        const user = await userModel.findOne({id: id});
        if(!user) {
            const newUser = await userModel.create({id: id, email: email, name: name, password: password});
            return newUser._id;
        }
        return user._id;
    } catch (error) {
        console.error("Error checking Google user:", error);
    }
}
export { signin, signup, signupWithGoogleCheck };