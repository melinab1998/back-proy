import mongoose from 'mongoose';
import 'dotenv/config'
import config from '../config.js'

const connectionString = config.MONGO_ATLAS_URL;

    try {
        await mongoose.connect(connectionString);
        console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(error);
    }


   

