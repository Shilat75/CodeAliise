import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodeData?.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export default auth;
