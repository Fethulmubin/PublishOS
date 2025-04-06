import express from 'express';
import { getComments, addComment } from '../controllers/comments.js';
import { auth } from '../middleware/auth.js';

const commentRouter = express.Router();

commentRouter.get('/', getComments);
commentRouter.post('/:postId', addComment);

export default commentRouter;
