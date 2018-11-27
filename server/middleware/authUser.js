import User from '../models/user';
import errorResponse from '../helpers/errorResponse';

const authenticateUser = (req, res, next) => {
  User.findById(req.decoded.userId, (error, user) => {
    if (error) {
      return errorResponse(500, error, res);
    }

    if (user) return next()

    return errorResponse(401, { message: 'Invalid token' }, res);
  });
};

export default authenticateUser;
