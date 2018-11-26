import jwt from 'jsonwebtoken';

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
        return res.status(401).json({
          status: 'error',
          message: 'Invalid token'
        });
      }
      return res.status(401).json({
        status: 'error',
        message: err.message,
      });
    }
    req.decoded = decoded;
    return next();
  });
};

export default verifyToken;
