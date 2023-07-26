import 'dotenv/config';

export default {
    PORT: process.env.PORT,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
}