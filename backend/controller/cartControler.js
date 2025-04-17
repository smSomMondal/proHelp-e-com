import Cart from '../models/Cart.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';

//by som
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Replace product & quantity
      cart.product = productId;
      cart.items.quantity = quantity;
    } else {
      // Create new cart
      cart = new Cart({
        user: userId,
        product: productId,
        items: {
          quantity,
          priceAtTime: product.price
        },
        stage: 'CREATED',
      });
    }

    await cart.save();
    if (!cart){
      return res.status(500).json({ message: 'Failed to save cart' });
    } 
      
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cartList.push(cart._id);
    await user.save();
    if (!user){
      return res.status(500).json({ message: 'Failed to save user cart' });
    }  

    res.status(200).json({ message: 'Cart saved successfully', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' +err.message });
  }
};

//by som
const updateCart = async (req, res) => {
  try {
  
    const {cartId , quantity} = req.body;

    const cart = await Cart.findOneAndUpdate(
      { _id: cartId },
      { $set: { 'items.quantity': quantity } },
      { new: true, runValidators: true }
    );

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json({ message: 'Cart updated', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};

const orderCart = expressAsyncHandler(async (req, res) => {


});
const cancelCartUser = expressAsyncHandler(async (req, res) => {


});
const appOrder = expressAsyncHandler(async (req, res) => {


});
const canOrder = expressAsyncHandler(async (req, res) => {


});

export { addToCart, updateCart, orderCart, cancelCartUser, appOrder, canOrder };