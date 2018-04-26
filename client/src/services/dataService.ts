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

function getSettings(userToken?: string) {
    return httpHelper.get('/api/settings', userToken);
}

function saveSettings(settings: any) {
    return httpHelper.post('/api/settings', settings);
}

function getCurrentUser(): Promise<UserData> {
    return httpHelper.get('/api/current-user');
}
