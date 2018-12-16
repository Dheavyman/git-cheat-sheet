import User from '../models/user';
import jwt from 'jsonwebtoken';
import errorResponse from '../helpers/errorResponse';

/**
 * User controller class
 *
 * @class UserController
 */
class UserController {
  /**
   * Create user
   *
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   *
   * @returns {object} Response object
   * @memberof UserController
   */
  static createUser(req, res) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    newUser.save((error, user) => {
      if (error) {
        if (error.message.includes('User validation failed: username')) {
          const statusCode = error.message.includes('exist') ? 409 : 400;

          return res.status(statusCode).json({
            status: 'error',
            message: error.message.substring(
              error.message.indexOf('username:') + 10,
              error.message.indexOf('.')).replace('Path', 'Input'),
          });
        }

        if (error.message.includes('User validation failed: password')) {
          return res.status(400).json({
            status: 'error',
            message: error.message.substring(
              error.message.indexOf('password:') + 10,
              error.message.indexOf('.')).replace('Path', 'Input'),
          });
        }

        return errorResponse(500, error, res);
      }

      const token = jwt.sign({
        userId: user._id
      }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      })

      return res.status(201).json({
        status: 'success',
        message: 'User created',
        data: {
          username: user.username,
          token
        }
      });
    });
  }

  /**
   * Login user
   *
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   *
   * @returns {object} Response object
   * @memberof UserController
   */
  static loginUser(req, res) {
    User.findOne({
      username: req.body.username.toLowerCase().trim()
    }, async (error, user) => {
      if (error) {
        return errorResponse(500, error, res);
      }

      if (user) {
        const isMatch = await user.validatePassword(req.body.password);

        if(isMatch) {
          const token = jwt.sign({
            userId: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
          })

          return res.status(200).json({
            status: 'success',
            message: 'User logged in',
            data: {
              username: user.username,
              token
            }
          });
        }
      }

      return errorResponse(
        401, { message: 'Username or password incorrect' }, res);
    });
  }
}

export default UserController;
