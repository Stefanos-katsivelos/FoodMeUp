import { Router } from "express";
import { sample_users } from "../data";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const usersCounts = await UserModel.countDocuments();
    if (usersCounts > 0) {
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed Is Done!");
  })
);

router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);

  try {
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      console.log("User not found with email:", email);
      res.status(400).send("Username or password is not valid!");
      return;
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isValidPassword);
    
    if (!isValidPassword) {
      console.log("Invalid password for user:", email);
      res.status(400).send("Username or password is not valid!");
      return;
    }
    
    res.send(generateTokenResponse(user));
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An unexpected error occurred during login!");
  }
}));
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  console.log("Registration attempt with email:", email);

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      console.log("User already exists with email:", email);
      res.status(400).send('User already exists, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      token: '',
      isAdmin: false,
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("An unexpected error occurred during registration!");
  }
}));

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      _id : user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },process.env.JWT_SECRET ||
    "SomeRandomText",
    {
      expiresIn: "30d",
    }
  );

  user.token = token;
  return user;
};

export default router;
