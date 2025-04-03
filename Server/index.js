import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import post_routes from './routes/posts.js'; // we should add .js when we importing in nodejs not react
import user_routes from './routes/users.js'

const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Adding my routes
app.use('/posts', post_routes);
app.use('/users', user_routes);

const PORT = process.env.PORT || 5555;
const CONNECTION_URL = "mongodb+srv://fetihul:AN8BqTMIYsH0V9oa@cluster0.80jdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
// mongodb+srv://fetihul:<db_password>@cluster0.80jdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.error(error.message));