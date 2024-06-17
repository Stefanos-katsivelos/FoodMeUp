import { model, Schema} from "mongoose";
import { Food, FoodSchema } from "./food.model";


export interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order {
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const orderSchema = new Schema<Order>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  paymentId: { type: String },
  totalPrice: { type: Number, required: true },
  items: { type: [OrderItemSchema], required: true },
},{
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});


export const OrderModel = model('order', orderSchema);
