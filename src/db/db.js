import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://admin:ylUI7FZmXovEDizv@cluster0.bocmmvr.mongodb.net/ecommerce?retryWrites=true&w=majority';

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
    console.log(error);
}