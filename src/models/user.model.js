import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'seller', 'admin'],
        default: 'user',
    },
    orders: {
        type: [{
            type: mongoose.Schema.Types.ObjectId
        }],
        ref: 'Orders',
        default: [],
    }
}, { timestamps: true });


export default mongoose.model('Users', userSchema);