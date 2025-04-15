import express from "express";
import { addProduct } from "../controller/productController.js";

const productApi = express.Router();

productApi.post("/addProduct", addProduct);

export default productApi;
/*
const express = require("express");
const { createProduct, getProducts } = require("../controller/productController");
const router = express.Router();

router.post("/add", createProduct);
router.get("/", getProducts);

module.exports = router;
*/