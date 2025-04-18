import express from 'express'
import dotenv  from 'dotenv';
import './mongo.connect.js'
import cors from 'cors'
import userApi from './route/userRoute.js';
import productApi from './route/productRoute.js';
import cartApi from './route/cartRoute.js';


dotenv.config()
const Port = process.env.PORT || 4000

const app = express();
app.use(express.json())
app.use(cors())


app.use('/user',userApi)
app.use('/product',productApi)
app.use('/cart',cartApi)


app.listen(Port, () => { console.log(`app is running at http://127.0.0.1:${Port}`) })