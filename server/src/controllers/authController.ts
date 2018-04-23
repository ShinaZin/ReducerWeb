import * as bcrypt from 'bcrypt-nodejs';
import * as Joi from 'joi';
import * as dateFns from 'date-fns';
import * as jwt from 'jsonwebtoken';

import helper from './_controllerHelper';
import userRepository from '../repositories/userRepository';
import AppError from '../appError';
import config from '../config';
import { loc } from '../helpers/localizationHelper';

export default {
    signUpPost,
    loginPost,
    activate,
    forgotPassword,
    resetPassword,
    resetPasswordPost
};

async function signUpPost(req, res) {
    try {
        const userData = await helper.loadSchema(req.body, {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required()
        });

        if (userData.password !== userData.confirmPassword)
            throw new AppError(loc('Passwords do not match.'));

        //Use lower-case e-mails to avoid case-sensitive e-mail matching
        userData.email = userData.email.toLowerCase();

        if (helper.getCurrentUser(req))
            throw new AppError(loc('Log out before signing up.'));

        const localUser = await userRepository.getLocalUserByEmail(
            userData.email
        );

        const alreadyActivated =
            localUser && localUser.profile.local.isActivated;
        if (alreadyActivated)
            throw new AppError(loc('This email is already activated.'));

        let user = await userRepository.getUserByEmail(userData.email);

        user = await userRepository.saveLocalAccount(user, userData);

        await helper.sendActivationEmail(
            user.email,
            user.profile.local.activation.token
        );

        const message = loc(
            'Activation email was send. Please, check you inbox.'
        );

        return helper.sendData({ message }, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function loginPost(req, res) {
    try {
        let loginSuccess = true;

        const userData = await helper.loadSchema(req.body, {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required()
        });

        let user = await userRepository.getLocalUserByEmail(
            userData.email.toLowerCase()
        );

        if (!user || !user.profile.local.isActivated)
            throw new AppError(
                loc(
                    'Your account is not activated yet. Please check your email for activation letter or sign up again to get a new one.'
                )
            );

        if (user) {
            const isValidPassword = bcrypt.compareSync(
                userData.password,
                user.profile.local.password
            );

            if (!isValidPassword) loginSuccess = false;
        } else {
            loginSuccess = false;
        }

        if (!loginSuccess) {
            throw new AppError(
                loc(
                    'The email address or password that you entered is not valid'
                )
            );
        }

        user = user.toObject();

        const token = jwt.sign(user, config.auth.jwtKey, {
            expiresIn: config.auth.expiry
        });

        const result = {
            token,
            user
        };

        return helper.sendData(result, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function activate(req, res) {
    try {
        let data: { message: string; status: string } = {} as any;

        const token = req.params.token;

        const localUser = await userRepository.getUserByActivationToken(token);

        if (!localUser) {
            data = {
                message: loc('Wrong activation token.'),
                status: 'error'
            };

            return helper.sendData(data, res);
        }

        const activationTime = localUser.profile.local.activation.created;
        const isTokenExpired =
            dateFns.differenceInHours(activationTime, new Date()) > 24;

        if (isTokenExpired) {
            const user = await userRepository.refreshActivationToken(
                localUser.id
            );

            await helper.sendActivationEmail(
                user.email,
                user.profile.local.activation.token
            );

            data = {
                message: loc(
                    'Activation token has expired. New activation email was send.'
                ),
                status: 'warning'
            };

            return helper.sendData(data, res);
        } else {
            await userRepository.activateUser(localUser.id);

            data = {
                message: loc('Your account was successfully activated.'),
                status: 'success'
            };

            return helper.sendData(data, res);
        }
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

async function forgotPassword(req, res) {
    try {
        const data = await helper.loadSchema(req.body, {
            email: Joi.string()
                .email()
                .required()
        });

        const email = data.email.toLowerCase();

        const localUser = await userRepository.getLocalUserByEmail(email);

        if (!localUser)
            throw new AppError(loc('There is no user with provided email.'));

        const updatedUser = await userRepository.resetPassword(localUser.id);

        await helper.sendResetPasswordEmail(
            updatedUser.email,
            updatedUser.profile.local.reset.token
        );

        const message = loc(
            `We've just dropped you an email. Please check your mail to reset your password. Thanks!`
        );

        return helper.sendData({ message }, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function resetPassword(req, res) {
    try {
        const token = req.params.token;

        const localUser = await getUserByResetToken(token);

        const data = {
            email: localUser.email,
            token
        };

        return helper.sendData(data, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function resetPasswordPost(req, res) {
    try {
        const data = await helper.loadSchema(req.body, {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
            token: Joi.string().required()
        });

        if (data.password !== data.confirmPassword)
            throw new AppError(loc('Passwords do not match.'));

        const localUser = await getUserByResetToken(data.token);

        await userRepository.updateUserPassword(localUser.id, data.password);

        const message = loc('Your password was reset successfully.');

        helper.sendData({ message }, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function getUserByResetToken(token) {
    if (!token) throw new AppError(loc('No reset token provided.'));

    const localUser = await userRepository.getUserByResetToken(token);

    if (!localUser) throw new AppError(loc('Wrong reset password token.'));

    const activationTime = localUser.profile.local.reset.created;

    const isTokenExpired =
        dateFns.differenceInHours(activationTime, new Date()) > 24;

    if (isTokenExpired) {
        const user = await userRepository.refreshResetToken(localUser.id);

        await helper.sendResetPasswordEmail(
            user.email,
            user.profile.local.reset.token
        );

        throw new AppError(
            loc(
                'Reset password token has expired. New activation email was send.'
            )
        );
    }

    return localUser;
}
