import mongoose from 'mongoose';

export const init = async () => {
    try {
        const URI = 'mongodb+srv://developer:aVCYzG2EeXUS2qlc@cluster0.wykgck4.mongodb.net/ecommerce';
        await mongoose.connect(URI);
        console.log('Database conected 🚀');
    } catch (error) {
        console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
}

