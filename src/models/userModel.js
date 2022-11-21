import { mongoose, Schema } from 'mongoose';
import validator from 'validator';

const User = new Schema(
    {
        name: {
            type: String,
            default: 'Anonymous',
            trim: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('This is not an email');
                }
            },
        },
        age: {
            type: Number,
            validate(value) {
                if (age <= 0) {
                    throw new Error('Age can not be negative');
                }
            },
        },
        password: {},
    },
    { timestamps: true }
);
