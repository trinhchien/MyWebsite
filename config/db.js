import mongoose from 'mongoose';

// const dbUri =
//   "mongodb+srv://chientd:IH3071914@cluster0.m8xwpym.mongodb.net/?retryWrites=true&w=majority/MyWebsite";
// const dbUri = 'mongodb://localhost:27017/MyWebsite'
// const dbUri =
//     'mongodb+srv://chientd:IH3071914@cluster0.m8xwpym.mongodb.net/MyWebsite';
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
