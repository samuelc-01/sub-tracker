import { Router } from 'express';
import * as subscriptionController from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router();

subscriptionRouter.get('/', subscriptionController.getAllSubscriptions);
subscriptionRouter.get('/upcoming-renewals',subscriptionController.getUpcomingRenewals);
subscriptionRouter.get('/user/:id', authorize, subscriptionController.getUserSubscription);
subscriptionRouter.get('/:id', subscriptionController.getSubscriptionById);
subscriptionRouter.post('/', authorize, subscriptionController.createSubscription);
subscriptionRouter.put('/:id', subscriptionController.updateSubscription);
subscriptionRouter.put('/:id/cancel', subscriptionController.cancelSubscription);
subscriptionRouter.delete('/:id', subscriptionController.deleteSubscription);

export default subscriptionRouter;