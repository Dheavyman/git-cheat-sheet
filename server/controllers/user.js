import User from '../models/user';
import jwt from 'jsonwebtoken';

class UserController {
  static createUser(req, res) {
    const newUser = new User(req.body);

    newUser.save((error, user) => {
      if (error) {
        if (error.message.includes('User validation failed: username')) {
          return res.status(400).json({
            status: 'error',
            message: error.message.substring(
              error.message.indexOf('Username'),
              error.message.indexOf('.')),
          });
        }

        if (error.message.includes('User validation failed: password')) {
          return res.status(400).json({
            status: 'error',
            message: error.message.substring(
              error.message.indexOf('Password'),
              error.message.indexOf('.')),
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
}

export default UserController;
