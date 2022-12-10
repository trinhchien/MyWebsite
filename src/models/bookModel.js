import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        name: {
            type: String,
            default: 'NoName',
        },
        description: { type: String, default: '(some description)' },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
    },
    { timestamps: true }
);

const taskModel = mongoose.model('book', bookSchema);

export { taskModel };
