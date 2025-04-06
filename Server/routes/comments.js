import express from 'express';
import { getComments, addComment, updateComment, deleteComment} from '../controllers/comments.js';
import { auth } from '../middleware/auth.js';

const commentRouter = express.Router();

commentRouter.get('/getComments/:postId', auth, getComments);
commentRouter.post('/addComment/:postId', auth, addComment);
commentRouter.patch('/updateComment/:id', auth, updateComment);
commentRouter.delete('/deleteComment/:id', auth, deleteComment);

export default commentRouter;
