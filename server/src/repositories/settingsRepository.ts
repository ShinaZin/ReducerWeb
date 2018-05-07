import db from '../database/database';

export default {
    addSettings,
    updateSettings,
    getSettings,
    getSettingsById,
};

async function getSettings(userId) {
    const { Settings } = db.models;
    const query = {
        userId
    };
    const settings = await Settings.find(query);
    return settings.map(item =>
        mapSettings(item)
    );
}

async function getSettingsById(id: number) {
    const { Settings } = db.models;
    const settings = await Settings.findById(id);
    return mapSettings(settings);
}

async function updateSettings(settingsData) {
    const { Settings } = db.models;
    const settings = await Settings.findOne({ _id: settingsData.id });
    if (!settings) return;
    const result = await settings.save();
    return mapSettings(result);
}

async function addSettings(userId, settingsData) {
    const { Settings } = db.models;
    settingsData.userId = userId;
    const settings = await Settings.create(settingsData);
    return mapSettings(settings);
}

function mapSettings(settings) {
    settings._doc.id = settings._id;
    return settings;
}

