import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js'
import { DeleteUser, getUser, getUsers, UpdateUser } from '../controllers/user.controller.js';
import errorMiddleware from '../middlewares/error.middleware.js'

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', authorize , errorMiddleware, getUser );
userRouter.put('/:id', authorize, errorMiddleware, UpdateUser);
userRouter.delete('/:id', authorize, errorMiddleware, DeleteUser);

export default userRouter;