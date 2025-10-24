import Subscription from '../models/subscription.model.js '

export const createSubscription = async ( req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({success: true, data: subscription})
    }catch(error){
        next(error)
    }
}

export const getUserSubscription = async ( req, res, next) => {
    try{
        if(req.user.id != req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data: subscriptions})
    }catch(e){
    next(e)

    }
}

export const getAllSubscriptions = async ( req, res, next) => {
    try{
        const subscriptions = await Subscription.find();
    
        res.status(200).json({success: true, data: subscriptions})    
    } catch(e){
        next(e)
    }
}

export const getSubscriptionById = async ( req, res, next) => {
    try{
        const subscription  = await Subscription.findById(req.params.id);

        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: subscription})
    } catch(e){
        next(e)
    }
}

export const getUpcomingRenewals = async ( req, res, next) => {
    try{
        const currentDate = new Date();
        const upcomingDate = new Date();
        upcomingDate.setDate(currentDate.getDate() + 7);

        const subscriptions = await Subscription.find({
            renewalDate: { $gte: currentDate, $lte: upcomingDate }
        });

        res.status(200).json({success: true, data: subscriptions})
    } catch(e){
        next(e)
    }

}

export const updateSubscription = async ( req, res, next) => {
    try{
        const { id } = req.params;
        const updateData = req.body;

        const updatedSubscription = await Subscription.findByIdAndUpdate(id, updateData, { new: true });

        if(!updatedSubscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: updatedSubscription})

    } catch(e) {
        next(e)
    }
}

export const cancelSubscription = async ( req, res, next ) => {
    try{
        const { id } = req.params;

        const subscription = await Subscription.findById(id);

        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        
        subscription.status = 'inactive';
        await subscription.save();
        
        res.status(200).json({ success: true, data: subscription})
    } catch(e){
        next(e)
    }
}

export const deleteSubscription = async ( req, res, next) => {
    try{
        const { id } = req.params;

        const subscription = await Subscription.findByIdAndDelete(id);

        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'Subscription deleted successfully'})
    } catch(e) {
        next(e)
    }
}