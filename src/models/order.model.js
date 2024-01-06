import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    products: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
        }],
        ref: 'Products',
        default: [],
    }
    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'cancelled'] },
    total: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Orders', orderSchema);