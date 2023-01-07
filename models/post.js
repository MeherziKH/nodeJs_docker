import mongoose from 'mongoose';

const { model } = mongoose;
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: [{
            type: String,
            required: true
        }],
        owner: {
            type: Schema.Types.ObjectId, ref: "User",
        }
    },
    {
        timestamps: true
    }
);

export default model('Post', postSchema);