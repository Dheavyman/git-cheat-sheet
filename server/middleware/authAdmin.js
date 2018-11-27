import User from '../models/user';
import errorResponse from '../helpers/errorResponse';

const authenticateAdmin = (req, res, next) => {
  User.findById(req.decoded.userId, (error, user) => {
    if (error) {
      return errorResponse(500, error, res);
    }

    if (user) {
      if (user.role === 'admin') return next()

      return errorResponse(403, { message: 'Unauthorized access' }, res);
    }

    return errorResponse(401, { message: 'Invalid token' }, res);
  });
};

export default authenticateAdmin;
