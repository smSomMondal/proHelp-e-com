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
    if (!cart) {
      return res.status(500).json({ message: 'Failed to save cart' });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cartList.push(cart._id);
    await user.save();
    if (!user) {
      return res.status(500).json({ message: 'Failed to save user cart' });
    }

    res.status(200).json({ message: 'Cart saved successfully', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' + err.message });
  }
};

//by som
const updateCart = async (req, res) => {
  try {

    const { cartId, quantity } = req.body;

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
//ordercart

const orderCart = expressAsyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await cart.findOne({ user: userId }).populate('product');

    if (!cart) {
      return res.status(404).json({ message: 'cart not found' });
    }

    cart.stage = 'ORDERED';//update the cart after order
    await cart.save();

    res.status(200).json({
      message: 'Ordered placed succesfully',
      cart,

    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'server error' + err.message
    });

  }
});


const cancelCartUser = expressAsyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.stage = 'CANCELLED';
    await cart.save();
    res.status(200).json({
      message: 'cart cancel succesfully',
      cart,
    });

  } catch (err) {
    res.status(500).json({ message: 'server error' + err.message });
  }

});
const appOrder = expressAsyncHandler(async (req, res) => {
  try {
    const { cartId } = req.body;
    const cart = await cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'cart not found' });
    }
    if (cart !== stage) {
      return res.status(400).json({ message: 'Only ordered carts can be approved by seller' });
    }
    cart.stage = 'APPROVED';
    await cart.save();
    res.status(500).json({ message: 'Ordered approve by seller', cart });


  } catch (err) {
    res.status(200).json({ message: 'error' + err.message });
  }

});
const canOrder = expressAsyncHandler(async (req, res) => {
  try {
    const { cartId } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.stage !== 'ORDERED') {
      return res.status(400).json({ message: 'Only ordered carts can be cancelled by seller' });
    }

    cart.stage = 'CANCELLED_BY_SELLER';
    await cart.save();

    res.status(200).json({ message: 'Order cancelled by seller', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }

});

export { addToCart, updateCart, orderCart, cancelCartUser, appOrder, canOrder };