import express from "express";
import { addProduct, deleteProduct, updateProduct } from "../controller/productController.js";
import { chqSeler } from "../middleware/userMiddleware.js";

const productApi = express.Router();

productApi.post("/addProduct",chqSeler,addProduct);
productApi.post("/updateProduct",chqSeler, updateProduct);
productApi.post("/deleteProduct",chqSeler, deleteProduct);

export default productApi;