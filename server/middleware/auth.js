import jwt from 'jsonwebtoken';
import errorResponse from '../helpers/errorResponse';

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No token provided'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.message.includes('invalid')
          || err.message.includes('malformed')
          || err.message.includes('expired')) {
        return errorResponse(401, { message: 'Invalid token' }, res);
      }

      return errorResponse(401, err, res);
    }
    req.decoded = decoded;
    return next();
  });
};

export default verifyToken;
