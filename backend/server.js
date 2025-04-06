import express from 'express'
import dotenv  from 'dotenv';
import './mongo.connect.js'
import cors from 'cors'
import User from './model/userModel.js';
import userApi from './route/userRoute.js';
import productApi from './route/productRoute.js';


dotenv.config()
const Port = process.env.PORT || 4000

const app = express();
app.use(express.json())
app.use(cors)


/*
app.post("/signup", async(req, res) => {
    try {
        const { name, email, password, type, contact, address } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Create new user
        const newUser = new User({ name, email, password, type, contact, address });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})
*/


//middleware

/*
const chq = (req,res,next)=>{
    console.log("here chq");
    next()
}
const cqq=(req,res)=>{
    return res.send("hii");
}*/
app.get('/',(req,res)=>{
    res.send("hiiii234")
})

app.use('/user',userApi)
app.use('/product',productApi)


app.listen(Port, () => { console.log(`app is running at http://127.0.0.1:${Port}`) })