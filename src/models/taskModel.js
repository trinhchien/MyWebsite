import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskScheme = new Schema(
    {
        name: {
            type: String,
            default: 'NoName',
        },
        description: { type: String, default: '(some description)' },
        progress: {
            type: String,
            require: true,
            enum: ['completed', 'in progress', 'rejected'],
            default: 'in progress',
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
        people: {
            manager: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                require: true,
            },
            member: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'user',
                },
            ],
        },
    },
    { timestamps: true }
);

const taskModel = mongoose.model('task', taskScheme);

export { taskModel };
