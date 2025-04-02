import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';


const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ success: false, message: "User doesn't exist." });
        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid credentials." });
        // Generate token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, result: existingUser, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong." });

    }

}
const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existedUser = await User.findOne({ email });
        if (existedUser) return res.status(400).json({ success: false, message: "User already exists." });
    
        if (password.length < 8) return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords don't match." });
    
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
        res.status(200).json({ success: true, result: newUser, token });
    
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong." });

    }
   

}
export { signin, signup };