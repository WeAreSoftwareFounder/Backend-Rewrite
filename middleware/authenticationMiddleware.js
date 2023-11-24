import { verify } from 'jsonwebtoken';
import { findById } from '../models/userModel';

const authenticationMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual secret key
    const user = await findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticationMiddleware;
