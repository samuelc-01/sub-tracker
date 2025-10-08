import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price is required'],
    },
    currency: {
        type: Number,
        enum: ['USD', 'EUR', 'BRL'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: [true, 'Category is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment methods are required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date is required',
        }
    },
    renewalDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date is required',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, {timestamps: true});

subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next()
})
console.log("finish")
const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;