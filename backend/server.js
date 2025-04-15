const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://juhi57257:juhi123@cluster0.rrvvuyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
// Product schema
const Product = mongoose.model('Product', {
  name: String,
  image: String,
  price: Number,
  category: String,
});

// Cart schema
const CartItem = mongoose.model('CartItem', {
  productId: String,
  quantity: Number,
});

// Routes
app.get('/api/products', async (req, res) => {
  const { search, category } = req.query;
  let filter = {};
  if (search) filter.name = new RegExp(search, 'i');
  if (category) filter.category = category;

  const products = await Product.find(filter);
  res.json(products);
});

app.post('/api/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  const item = new CartItem({ productId, quantity });
  await item.save();
  res.json({ message: 'Added to cart' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
