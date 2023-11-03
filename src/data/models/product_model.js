import mongoose from 'mongoose';

const productSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: Array,
        default: ["https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg"]
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    category: {
        type: String,
        index: true,
        required: true,
        enum: ["cafe", "maquina","accesorio"]
    }
}, { timestamps: true });


export default mongoose.model('products', productSchema);