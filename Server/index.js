import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import post_routes from './routes/posts.js'; // we should add .js when we importing in nodejs not react
import user_routes from './routes/users.js'
import commentRouter from './routes/comments.js'; // Importing the comments route
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Apply middleware
const frontEndUrl = ['http://localhost:5173', 'https://memories-lb7c.onrender.com'];
app.use(cors({origin: frontEndUrl})); // Allow requests from the React app
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Adding my routes
app.use('/posts', post_routes);
app.use('/users', user_routes);
app.use('/comments', commentRouter);

const PORT = process.env.PORT || 5555;

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.error(error.message));