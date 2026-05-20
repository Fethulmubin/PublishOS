import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import post_routes from './routes/posts.js';
import user_routes from './routes/users.js'
import commentRouter from './routes/comments.js';
import dashboardRoutes from './routes/dashboard.js';
import aiStudioRoutes from './routes/aiStudio.js';
import scheduleRoutes from './routes/schedule.js';
import analyticsRoutes from './routes/analytics.js';
import notificationsRoutes from './routes/notifications.js';
import creatorProfileRoutes from './routes/creatorProfile.js';
import settingsRoutes from './routes/settings.js';
import integrationsRoutes from './routes/integrations.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://memories-lb7c.onrender.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/posts', post_routes);
app.use('/users', user_routes);
app.use('/comments', commentRouter);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiStudioRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/profile', creatorProfileRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/integrations', integrationsRoutes);

const PORT = process.env.PORT || 5555;

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.error(error.message));