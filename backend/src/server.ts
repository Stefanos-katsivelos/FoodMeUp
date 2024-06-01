import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import userRoutes from "./routers/user.routes";
import foodRoutes from "./routers/food.routes";
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGODB_URI!)
.then(
    () => { console.log("Connection to mongoDb established") },
    err => { console.log("Failed to connect to mongodb", err) }
) 

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

app.use("/api/foods", foodRoutes)
app.use("/api/users", userRoutes)


const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
