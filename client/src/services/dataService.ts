import httpHelper from '../helpers/httpHelper';

export default {
    getCurrentUser,
    getSettings,
    saveSettings
};

export interface UserData {
    email: string;
    profile: any;
}

function getSettings() {
    return httpHelper.get('/api/settings');
}

function saveSettings(settings: any) {
    return httpHelper.post('/api/settings', settings);
}

function getCurrentUser(): Promise<UserData> {
    return httpHelper.get('/api/current-user');
}
