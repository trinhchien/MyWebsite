import mongoose from 'mongoose';

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/MyWebsite');
        console.log('connected to database!!!');
    } catch (error) {
        console.log(err);
    }
}

export { connectDb };
