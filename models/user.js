import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        posts: [{
            type: Schema.Types.ObjectId, ref: "Post",
        }]
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);