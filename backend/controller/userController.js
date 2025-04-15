import User from "../model/userModel.js";

const signUp = async (req, res) => {
    try {
        const { name, email, password, type, contact, address } = req.body;
        //console.log(email,password);
        //console.log(req.headers);
        
        // Check if user already exists
        const existingUser = await User.findOne();
        if (existingUser) return res.status(200).json({ message: "User already exists",data:existingUser });

        // Create new user
        const newUser = new User({ name, email, password, type, contact, address });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export {signUp}