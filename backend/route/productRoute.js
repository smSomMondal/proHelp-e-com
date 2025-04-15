import express from "express";
import { getAllProducts, addProduct } from "../controller/productController.js";

const router = express.Router();

router.get("/products", getAllProducts); // ← USER PRODUCT LIST API

export default router;
