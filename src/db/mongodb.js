import mongoose from 'mongoose';
import config from '../config/config.js';

export const init = async () => {
    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Database conected 🚀');
    } catch (error) {
        console.log('Ha ocurrido un error al intentar conectarnos a la DB 😥', error.message);
    }
}

