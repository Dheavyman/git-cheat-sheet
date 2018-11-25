import User from '../models/user';

const authenticateUser = (req, res, next) => {
  User.findById(req.decoded.userId, (error, user) => {
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }

    if (user) return next()

    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  });
};

export default authenticateUser;
