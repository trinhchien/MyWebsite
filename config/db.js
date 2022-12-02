import mongoose from 'mongoose';

const dbUri = process.env.DB_URI;

async function connectDb() {
    try {
        await mongoose.connect(dbUri);
        console.log('connected to database!!!');
    } catch (error) {
        console.log(error);
    }
}

export { connectDb };
