import { Router } from 'express';
import * as subscriptionController from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, subscriptionController.getAllSubscriptions);
subscriptionRouter.get('/upcoming-renewals', authorize,subscriptionController.getUpcomingRenewals);
subscriptionRouter.get('/user/:id', authorize, subscriptionController.getUserSubscription);
subscriptionRouter.get('/:id', authorize,subscriptionController.getSubscriptionById);
subscriptionRouter.post('/', authorize, subscriptionController.createSubscription);
subscriptionRouter.put('/:id',authorize, subscriptionController.updateSubscription);
subscriptionRouter.put('/:id/cancel',authorize, subscriptionController.cancelSubscription);
subscriptionRouter.delete('/:id',authorize, subscriptionController.deleteSubscription);

export default subscriptionRouter;