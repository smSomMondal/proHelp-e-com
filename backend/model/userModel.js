import mongoose from "mongoose";


const cart = new mongoose.Schema({
    Id:{
        type : mongoose.Schema.Types.ObjectId,
    },
    step:{
        type:String,
        enum:["add","order","buy"],
        default:"add",
    }
})


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["admin", "user", "vendor"], // Modify roles as per your needs
        default: "user",
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        state: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        pin: { type: String, required: true },
        road: { type: String, default: null }, // Optional
        houseNo: { type: String, default: null }, // Optional
    },
    cartlist:[cart],
    timeStamp: {
        type: Date,
        default: Date.now, // Auto-generates timestamp when a user is created
    },
});

const User = mongoose.model("User", userSchema);

export default User;
