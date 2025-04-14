import express from 'express';
import { getComments, addComment, updateComment, deleteComment, getCommentRecommendation} from '../controllers/comments.js';
import { auth } from '../middleware/auth.js';

const commentRouter = express.Router();

commentRouter.get('/getComments/:postId', auth, getComments);
commentRouter.post('/addComment/:postId', auth, addComment);
commentRouter.patch('/updateComment/:id', auth, updateComment);
commentRouter.delete('/deleteComment/:id', auth, deleteComment);
commentRouter.get('/getRecommendation/:postId', auth, getCommentRecommendation);

export default commentRouter;
