import User from '../models/user';

const authenticateAdmin = (req, res, next) => {
  User.findById(req.decoded.userId, (error, user) => {
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }

    if (user) {
      if (user.role === 'admin') return next()

      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized access'
      });
    }

    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  });
};

export default authenticateAdmin;
