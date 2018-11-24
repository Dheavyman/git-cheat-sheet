import UserController from '../controllers/user';

export default (app) => {
  app.route('/api/v1/auth/signup')
    .post(UserController.createUser);
};
