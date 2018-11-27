import GitCheat from '../models/gitCheat';
import errorResponse from '../helpers/errorResponse';

/**
 * Git cheat controller
 *
 * @class GitCheatController
 */
class GitCheatController {
  /**
   * Create git cheat
   *
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   *
   * @returns {object} Response object
   * @memberof GitCheatController
   */
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

        return errorResponse(500, error, res);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Git cheat created',
        data: { cheat: gitCheat },
      });
    });
  }

  /**
   * Get all cheats
   *
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   *
   * @returns {object} Response object
   * @memberof GitCheatController
   */
  static getAllCheats(req, res) {
    GitCheat.find({}, (error, cheats) => {
      if(error) {
        return errorResponse(500, error, res);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Git cheats fetched',
        data: { cheats },
      });
    });
  }

  /**
   * Update git cheat
   *
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   *
   * @returns {object} Response object
   * @memberof GitCheatController
   */
  static updateGitCheat(req, res) {
    GitCheat.findById(req.params.cheatId, (error, cheat) => {
      if (error) {
        if (error.message.includes('ObjectId')) {
          return errorResponse(
            400, { message: 'Invalid cheat Id in parameter' }, res);
        }

        return errorResponse(500, error, res);
      }

      if (!cheat) {
        return errorResponse(404, { message: 'Git cheat not found'}, res);
      }

      for (let key in req.body) {
        if (cheat.get(key)) {
          cheat[key] = req.body[key];
        }
      }

      cheat.save((err, updatedCheat) => {
        if (err) {
          return errorResponse(500, error, res);
        }

        return res.status(200).json({
          status: 'success',
          message: 'Git cheat updated',
          data: { cheat: updatedCheat }
        });
      });
    });
  }

  /**
   * Remove git cheat
   *
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   *
   * @returns {object} Response object
   * @memberof GitCheatController
   */
  static removeGitCheat(req, res) {
    GitCheat.findByIdAndDelete(req.params.cheatId, (error, cheat) => {
      if (error) {
        if (error.message.includes('ObjectId')) {
          return errorResponse(
            400, { message: 'Invalid cheat Id in parameter' }, res);
        }

        return errorResponse(500, error, res);
      }

      if (!cheat) {
        return errorResponse(404, { message: 'Git cheat not found' }, res);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Git cheat removed',
      });
    });
  }
};

export default GitCheatController;
