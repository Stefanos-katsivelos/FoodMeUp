import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";

const router = Router();

router.post('/create', asyncHandler(async (req: any, res: any) => {
  console.log('Received order:', req.body);
  console.log('Authenticated user in order route:', req.user);  // Log the authenticated user

  const requestOrder = req.body;

  if (requestOrder.items.length <= 0) {
    res.status(400).send('Cart Is Empty');
    return;
  }

  if (!req.user) {
    res.status(401).send('Unauthorized');
    return;
  }

  const newOrder = new OrderModel({
    ...requestOrder,
    user: req.user._id,
  });

  await newOrder.save();
  res.send(newOrder);
}));

export default router;