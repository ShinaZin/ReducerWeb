import db from '../database/database';
import { MongooseDocument } from 'mongoose';

export namespace settingsRepository {
    export async function getSettings(userId) {
        const { Settings } = db.models;
        const query = {
            userId
        };
        const settings = await Settings.find(query);
        return settings.map(item =>
            mapSettings(item)
        );
    }

    export async function getSettingsById(id: number) {
        const { Settings } = db.models;
        const settings = await Settings.findById(id);
        return mapSettings(settings);
    }

    export async function createOrUpdateSettings(userId, settingsData) {
        const { Settings } = db.models;
        const settings = await Settings.findOne({ userId: userId });
        let result = null;
        if (!settings) {
            settingsData.userId = userId;
            result = await Settings.create(settingsData);
        } else {
            const newSettings = Object.assign(settings, settingsData); 
            result = await newSettings.save();
        }
        return mapSettings(result);
    }
}

function mapSettings(settings) {
    settings._doc.id = settings._id;
    return settings;
}

