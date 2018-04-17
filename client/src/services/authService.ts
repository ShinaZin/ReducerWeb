import * as Cookies from 'js-cookie';

import httpHelper from '../helpers/httpHelper';

export default {
  signUp,
  login,
  activateAccount,
  passwordForgot,
  resetPasswordTokenCheck,
  resetPassword,
  getToken,
  saveToken
};

function signUp(user: any) {
  return httpHelper.post('/api/sign-up', user);
}

function login(user: any) {
  return httpHelper.post('/api/login', user);
}

function activateAccount(token: string) {
  return httpHelper.get(`/api/activate/${token}`, '');
}

function passwordForgot(email: string) {
  return httpHelper.post('/api/password-forgot', {email});
}

function resetPasswordTokenCheck(token: string) {
  return httpHelper.get(`/api/password-reset/${token}`, '');
}

function resetPassword(user: any) {
  return httpHelper.post('/api/password-reset', user);
}

function getToken() {
  let token = Cookies.get('jwt_token');
  return token;
}

function saveToken(jwt: string) {
  Cookies.set('jwt_token', jwt);
}
