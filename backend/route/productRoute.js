import express from "express";
import { addProduct } from "../controller/productController.js";

const productApi = express.Router();

productApi.post("/addProduct", addProduct);

export default productApi;