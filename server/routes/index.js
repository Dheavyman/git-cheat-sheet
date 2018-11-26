import UserController from '../controllers/user';
import GitCheatController from '../controllers/gitCheat';
import verifyToken from '../middleware/auth';
import authenticateAdmin from '../middleware/authAdmin';
import authenticateUser from '../middleware/authUser';

export default (app) => {
  app.post('/api/v1/auth/signup', UserController.createUser);

  app.post('/api/v1/auth/login', UserController.loginUser);

  app.route('/api/v1/cheats')
    .post(verifyToken, authenticateAdmin, GitCheatController.createGitCheat)
    .get(verifyToken, authenticateUser, GitCheatController.getAllCheats);

  app.route('/api/v1/cheats/:cheatId')
    .put(verifyToken, authenticateAdmin, GitCheatController.updateGitCheat)
    .delete(verifyToken, authenticateAdmin, GitCheatController.removeGitCheat);
};
