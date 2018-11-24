import User from '../models/user';
import jwt from 'jsonwebtoken';

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
    const newUser = new User(req.body);

    newUser.save((error, user) => {
      if (error) {
        if (error.message.includes('User validation failed: username')) {
          return res.status(400).json({
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

        if (error.message.includes('duplicate')) {
          return res.status(409).json({
            status: 'error',
            message: 'Username already exist'
          })
        }

        return res.status(500).json({
          status: 'error',
          message: error.message,
        });
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
      username: req.body.username.trim()
    }, async (error, user) => {
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: error.message,
        });
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
              token
            }
          });
        }
      }

      return res.status(401).json({
        status: 'error',
        message: 'Username or password incorrect'
      });
    });
  }
}

export default UserController;
