import mongoose from 'mongoose';
import 'dotenv/config'
import config from '../config.js'
import { logger } from '../utils/logger.js'

const connectionString = config.MONGO_ATLAS_URL;

    try {
        await mongoose.connect(connectionString);
       logger.info('Conectado a la base de datos de MongoDB');
    } catch (error) {
        logger.error(error);
    }


   

