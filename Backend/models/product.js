import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offers: {
        type: Number
    },
    productPictures: [
        {
            img: {
                type: String
            }
        }
    ],
    reviews: [{
        userId: {type : mongoose.Schema.Types.ObjectId, ref: "User"},
        review: String,
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedAt: Date,
},
    {
        timestamps: true
    });

export default mongoose.model("Product", productSchema);