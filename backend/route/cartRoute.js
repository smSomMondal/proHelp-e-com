import express from 'express';
import {chqProtectedUser,chqSeler} from '../middleware/userMiddleware.js';
import { addToCart, updateCart, orderCart,cancelCartUser,canOrder ,appOrder} from '../controllers/cartController.js';

const cartApi = express.Router();

cartApi.post('/add', addToCart); 
cartApi.post('/update', updateCart); 
cartApi.post('/order',chqProtectedUser, orderCart); 
cartApi.post('/cancelUser',chqProtectedUser, cancelCartUser); 
cartApi.post('/approveSeler',chqSeler, appOrder); 
cartApi.post('/cancelSeler',chqSeler, canOrder); 

export default cartApi;