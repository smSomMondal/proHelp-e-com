import Product from "../model/productModel.js";

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            pId,
            category,
            subcategory,
            stock,
            sellerId,
            imagesUrl
        } = req.body;

        console.log("hii");
        
        // Basic validation (optional, you can also use Joi or express-validator)
        if (!name || !description || !price || !pId || !category || !sellerId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            pId,
            category,
            subcategory,
            stock,
            sellerId,
            imagesUrl
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}




export {addProduct}