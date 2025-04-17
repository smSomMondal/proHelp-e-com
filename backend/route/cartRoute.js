import express from 'express';
import { addToCart, updateCart, orderCart,cancelCartUser,canOrder ,appOrder} from '../controllers/cartController.js';

const cartApi = express.Router();

cartApi.post('/add', addToCart); 
cartApi.post('/update', updateCart); 
cartApi.post('/order', orderCart); 
cartApi.post('/cancelUser', cancelCartUser); 
cartApi.post('/approveSeler', appOrder); 
cartApi.post('/cancelSeler', canOrder); 

export default cartApi;