import httpHelper from '../helpers/httpHelper';

export default {
    getCurrentUser,
    getSettings,
    saveSettings
};

function getSettings(userToken?: string) {
    return httpHelper.get('/api/settings', userToken);
}

function saveSettings(settings: any) {
    return httpHelper.post('/api/settings', settings);
}

function getCurrentUser() {
    return httpHelper.get('/api/current-user');
}