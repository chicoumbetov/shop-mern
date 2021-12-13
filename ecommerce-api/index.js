import express from "express"
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import productRoute from"./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import stripeRoute from "./routes/stripe.js";

const app = express();
dotenv.config()

// middleware with CORS pour que front 4200 et back 3000 puissent communiquer entre eux.
app.use((req, res, next) => {
    // ces headers permettent:

    // d'accéder à notre API depuis n'importe quelle origine ( '*'
    res.setHeader('Access-Control-Allow-Origin', '*');

    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(express.json());

app.use("/ecommerce-api/auth", authRoutes);
app.use("/ecommerce-api/users", userRoutes);
app.use("/ecommerce-api/products", productRoute);
app.use("/ecommerce-api/carts", cartRoute);
app.use("/ecommerce-api/orders", orderRoute);
// app.use("/ecommerce-api/checkout", stripeRoute);


const PORT = process.env.PORT || 6005;

mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error) )

// app.listen(process.env.PORT || 5005 || 3000, () => { console.log("Backend server is running!"); });

app.get('/', (req, res) => {
    res.send('Hello to e-commerce shop API')
})