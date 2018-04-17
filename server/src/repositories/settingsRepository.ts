import pathHelper from '../helpers/pathHelper';
import * as fs from 'fs-extra';
import * as _ from 'lodash';

export default {
    saveSettings,
    getSettings,
    getCurrentUser
};

const dataPath = pathHelper.getLocalRelative('data.json');
const initDataPath = pathHelper.getDataRelative('data.json');
let dataCache = null;

function getData(): {items: any} {
    if (!dataCache) {
        if (fs.existsSync(dataPath)) {
            dataCache = fs.readJsonSync(dataPath);
        } else {
            dataCache = fs.readJsonSync(initDataPath);
        }
    }

    return dataCache;
}

function saveData() {
    fs.writeJSONSync(dataPath, dataCache);
}

function getCurrentUser(): any {
    if (!dataCache) {
        if (fs.existsSync(dataPath)) {
            dataCache = fs.readJsonSync(dataPath);
        } else {
            dataCache = fs.readJsonSync(initDataPath);
        }
    }

    return dataCache;
}

function getSettings() {
    let data = getData();

    return data.items;
}

function saveSettings(settings) {
    let data = getData();

    let maxId = _.max<number>(data.items.map(x => x.id));

    settings  = {
        id: maxId ? maxId + 1 : 1,
        ...settings
    };

    data.items.push(settings);

    saveData();

    return settings;
}

