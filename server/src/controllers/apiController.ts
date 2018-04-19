import * as Joi from 'joi';

import AppError from '../appError';
import helper from './_controllerHelper';
import userRepository from '../repositories/userRepository';
import settingsRepository from '../repositories/settingsRepository';

export default {
  currentUser,
  getSettings,
  saveSettings,
};

async function currentUser(req, res) {
  try {
    const userId = helper.getCurrentUser(req)._id;

    const user = await userRepository.getUserById(userId);

    return helper.sendData(user, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

// async function assertUserOwnsCategory(userId, categoryId) {
//   const category = await categoryRepository.getCategoryById(categoryId);

//   const hasRights = category && category.userId.toString() === userId;

//   if (!hasRights) throw new AppError('User does not own category');
// }

async function getSettings(req, res) {
  try {
    let settings = await settingsRepository.getSettings();
    return helper.sendData(settings, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveSettings(req, res) {
  try {
    let data = await helper.loadSchema(req.body, {
      name: Joi.string().required()
    });

    let settings = await settingsRepository.saveSettings(data);

    return helper.sendData(settings, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}
