import GitCheat from '../models/gitCheat';

class GitCheatController {
  static createGitCheat(req, res) {
    const newGitCheat = new GitCheat(req.body);

    newGitCheat.save((error, gitCheat) => {
      if (error) {
        if (error.message.includes('GitCheat validation failed: category')) {
          return res.status(400).json({
            status: 'error',
            message: error.message.substring(
              error.message.indexOf('category:') + 10,
              error.message.indexOf('.')).replace('Path', 'Input'),
          });
        }

        if (error.message.includes('GitCheat validation failed: description')) {
          return res.status(400).json({
            status: 'error',
            message: error.message.substring(
              error.message.indexOf('description:') + 13,
              error.message.indexOf('.')).replace('Path', 'Input'),
          });
        }

        if (error.message.includes('GitCheat validation failed: command')) {
          return res.status(400).json({
            status: 'error',
            message: error.message.substring(
              error.message.indexOf('command:') + 9,
              error.message.indexOf('.')).replace('Path', 'Input'),
          });
        }

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
