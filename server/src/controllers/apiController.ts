import * as Joi from 'joi';

import AppError from '../appError';
import { settingsRepository } from '../repositories/settingsRepository';
import userRepository from '../repositories/userRepository';
import helper from './_controllerHelper';

export namespace apiController {
    export async function currentUser(req, res) {
        try {
            const userId = helper.getCurrentUser(req)._id;
            const user = await userRepository.getUserById(userId);
            return helper.sendData(user, res);
        } catch (err) {
            return helper.sendFailureMessage(err, res);
        }
    }

    export async function getSettings(req, res) {
        try {
            const userId = helper.getCurrentUser(req)._id;
            const settings = await settingsRepository.getSettings(userId);
            return helper.sendData(settings, res);
        } catch (err) {
            return helper.sendFailureMessage(err, res);
        }
    }

    export async function saveSettings(req, res) {
        try {
            const data = await helper.loadSchema(req.body, {
                id: Joi.string().allow(null),
                options: Joi.object().optional(),
                dictionary: Joi.array().optional()
            });
            const userId = helper.getCurrentUser(req)._id;
            // await assertUserOwnsSettings(userId, data.id);
            const settings = await settingsRepository.createOrUpdateSettings(userId, data);
            return helper.sendData(settings, res);
        } catch (err) {
            return helper.sendFailureMessage(err, res);
        }
    }
}

async function assertUserOwnsSettings(userId, settingsId) {
    const settings = await settingsRepository.getSettingsById(settingsId);
    const hasRights = settings && settings.userId.toString() === userId;
    if (!hasRights) throw new AppError('User does not own settings');
}
