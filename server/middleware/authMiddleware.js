import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * Middleware to authenticate requests using JWT.
 */
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access: No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Add user info to request

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access: Invalid token' });
  }
};
