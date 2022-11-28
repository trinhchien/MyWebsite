import mongoose from 'mongoose';
const { Schema } = mongoose;
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { taskRouter } from '../routers/taskRouter.js';
import { taskModel } from './taskModel.js';

const userSchema = new Schema(
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
                    throw new Error('This is not an email!');
                }
            },
        },
        age: {
            type: Number,
            validate(value) {
                if (value <= 0) {
                    throw new Error('Age can not be negative!');
                }
            },
        },
        password: {
            type: String,
            minLength: 8,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error('Password is too weak!');
                }
            },
        },
        status: {
            type: String,
            enum: ['active', 'delete', 'ban'],
            default: 'activate',
            require: true,
        },
        role: {
            type: String,
            enum: ['admin', 'mod', 'user'],
            default: 'user',
            require: true,
        },
        // task: [{ type: Schema.Types.ObjectId, ref: 'task' }],
        tokens: [
            {
                token: {
                    type: String,
                    require: true,
                },
            },
        ],
    },
    { timestamps: true }
);

userSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'createdBy',
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id.toString(),
            role: user.role,
            status: user.status,
        },
        global.SECRET_JWT
    );
    user.tokens.push({ token });
    await user.save();
    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('can not login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('can not login');
    }
    return user;
};

userSchema.pre(['save', 'update'], async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.pre('remove', async function (next) {
    const user = this;
    taskModel.deleteMany({ createdBy: user._id });
    next();
});

const userModel = mongoose.model('user', userSchema);

export { userModel };
