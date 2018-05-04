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

async function assertUserOwnsSettings(userId, settingsId) {
  const settings = await settingsRepository.getSettingsById(settingsId);
  const hasRights = settings && settings.userId.toString() === userId;
  if (!hasRights) throw new AppError('User does not own settings');
}

async function getSettings(req, res) {
  try {
    const userId = helper.getCurrentUser(req)._id;
    const settings = await settingsRepository.getSettings(userId);
    return helper.sendData(settings, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveSettings(req, res) {
  try {
    const data = await helper.loadSchema(req.body, {
      settings: Joi.object().keys({
        id: Joi.string().allow(null),
        options: Joi.object().allow(null),
        dict: Joi.object().allow(null)
      })
    });
    const userId = helper.getCurrentUser(req)._id;
    let settings = null;
    if (data.settings.id) {
      await assertUserOwnsSettings(userId, data.settings.id);
      settings = await settingsRepository.updateSettings(data.settings);
    } else {
      settings = await settingsRepository.addSettings(userId, data.settings);
    }
    return helper.sendData(settings, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}
