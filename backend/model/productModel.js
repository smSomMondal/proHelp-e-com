import mongoose from "mongoose";

const cart = new mongoose.Schema({
    Id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    step: {
        type: String,
        enum: ["add", "order", "buy"],
        default: "add",
    },
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    prise: {
        type: String,
        required: true,
    },
    pId: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        enum: ["admin", "user", "vendor"], // Modify roles as per your needs
        default: "user",
    },
    subcategory: {
        type: String,
        enum: ["admin", "user", "vendor"], // Modify roles as per your needs
        default: "user",
    },
    stock: {
        type: String,
        required: true,
        default: 0,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your Seller is a User model
        required: true
    },
    imagesUrl: {
        type: String,
    },
    timeStamp: {
        type: Date,
        default: Date.now, // Auto-generates timestamp when a user is created
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
