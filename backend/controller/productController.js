// Get all products for users
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error });
    }
};

export { addProduct, getAllProducts }; // Make sure it's exported
