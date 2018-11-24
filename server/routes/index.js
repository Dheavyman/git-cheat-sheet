import UserController from '../controllers/user';

export default (app) => {
  app.post('/api/v1/auth/signup', UserController.createUser);

  app.post('/api/v1/auth/login', UserController.loginUser);
};
