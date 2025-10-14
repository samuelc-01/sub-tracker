import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js'
import { getUser, getUsers } from '../controllers/user.controller.js';
import errorMiddleware from '../middlewares/error.middleware.js'

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', authorize , errorMiddleware, getUser );
userRouter.post('/', (req, res) => res.send({title:"CREATE new user"}));
userRouter.put('/:id', (req, res) => res.send({title:"UPDATE users"}));
userRouter.delete('/:id', (req, res) => res.send({title:"DELETE user"}));

export default userRouter;