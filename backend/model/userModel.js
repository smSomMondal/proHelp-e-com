import mongoose from "mongoose";
import bcrypt from "bcrypt";


/*const cart = new mongoose.Schema({
    priductId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    buyerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    step:{
        type:String,
        enum:["add","order","buy"],
        default:"add",
    }
},{_id:true,timestamps:true});*/


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
    userType: {
        type: String,
        enum: ["buyer","seller","admin"],
        default: "buyer",
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        state: { type: String },
        district: { type: String},
        city: { type: String},
        pin: { type: String },
        road: { type: String},
        houseNo: { type: String},
    },
    //cartlist:[cart],
    cartList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    }],
    productList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
},{timestamps:true});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.comparePassword = async function(pass){
    return await bcrypt.compare(pass, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
