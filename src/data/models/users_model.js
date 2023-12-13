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
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }
}, { timestamps: true });

userSchema.pre('find', function () {
    this.populate('cart');
});
userSchema.post('save', async function (doc) {
    if (!doc.cart) {
        const Cart = mongoose.model('Cart');
        const cart = await Cart.create({ user: doc._id, products: [] });
        doc.cart = cart._id;
        await doc.save();
    }
});




export default mongoose.model('User', userSchema);
