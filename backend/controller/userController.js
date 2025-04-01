import User from "../model/userModel.js";

const signUp = async (req, res) => {
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
}


export {signUp}