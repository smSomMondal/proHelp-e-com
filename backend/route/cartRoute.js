import express from 'express';
import { addToCart, updateCart } from '../controllers/cartController.js';

const cartApi = express.Router();

cartApi.post('/add', addToCart); 
cartApi.put('/update', updateCart); 

export default cartApi;