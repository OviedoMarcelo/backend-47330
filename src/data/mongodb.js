import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const init = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database conected 🚀');
    } catch (error) {
        console.log('Ha ocurrido un error al intentar conectarnos a la DB 😥', error.message);
    }
}

