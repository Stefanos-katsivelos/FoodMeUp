import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token received in middleware:', token);  // Log the token received

  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log('Decoded token:', decoded);  // Log the decoded token

    if (typeof decoded === 'string') {
      throw new Error('Invalid token structure');
    }

    const user = await UserModel.findOne({ _id: (decoded as jwt.JwtPayload)._id });

    if (!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default authMiddleware;