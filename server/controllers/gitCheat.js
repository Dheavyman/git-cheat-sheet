import GitCheat from '../models/gitCheat';

class GitCheatController {
  static createGitCheat(req, res) {
    const newGitCheat = new GitCheat(req.body);

    newGitCheat.save((error, gitCheat) => {
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: error.message,
        });
      }

      return res.status(201).json({
        status: 'success',
        message: 'Git cheat created',
        data: gitCheat,
      });
    });
  }
};

export default GitCheatController;
