import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routers/user.routes";
import foodRoutes from "./routers/food.routes";
import mongoose from 'mongoose';
import authMiddleware from './middlewares/authMiddleware';
import orderRoutes from './routers/order.routes';
import { setupSwagger } from './swagger';


const app = express();
app.use(express.json());


const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connection to MongoDB established");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    
    if (err.name === 'MongoNetworkError') {
      console.error('Network error while trying to connect to MongoDB');
    } else if (err.message.includes('Authentication failed')) {
      console.error('Authentication failed. Please check your credentials');
    } else {
      console.error('MongoDB connection error:', err.message);
    }
  });

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

app.use("/api/foods", foodRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", authMiddleware, orderRoutes)

setupSwagger(app);



const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
