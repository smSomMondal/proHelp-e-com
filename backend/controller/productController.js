import Product from "../model/productModel.js";
import Cart from "../model/cartModel.js";
import expressAsyncHandler from "express-async-handler";

const addProduct = expressAsyncHandler(async (req, res) => {
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
        if (!name || !description || !price || !pId || !category || !subcategory || !stock || !sellerId) {
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
            sellerId: req.body.user._id,
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
});


const updateProduct = expressAsyncHandler(async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            pId,
            category,
            subcategory,
            stock,
            imagesUrl
        } = req.body; 

        const prod = await Product.findById(pId).select("-orderList");

        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (prod.sellerId.toString() !== req.body.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this product" });
        }
        prod.name = name || prod.name;
        prod.description = description || prod.description;
        prod.price = price || prod.price;
        prod.category = category || prod.category;
        prod.subcategory = subcategory || prod.subcategory;
        prod.stock = stock || prod.stock;
        prod.imagesUrl = imagesUrl || prod.imagesUrl;

        prod.save();

        if (!prod) {
            return res.status(400).json({
                message: "Product not updated",
                product: prod
            });
        } else {
            return res.status(200).json({
                message: "Product updated sucessfull",
                product: prod
            });
        }

    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {

    try {
        const { pId } = req.body;
        const prod = await Product.findById(pId);
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (prod.sellerId.toString() !== req.body.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this product" });
        }

        await Cart.updateMany(
            {
                product: pId,
                stage: 'ORDERED'     
            },
            {
                $set: {
                    stage: 'CANCELLED' 
                }
            }
        );
        const result = await Product.deleteOne({ _id: pId });

        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(400).json({ message: "Product not deleted" });
        }


    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Server error", error: error.message });

    }
});

export { addProduct, updateProduct ,deleteProduct}