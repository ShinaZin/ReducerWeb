import * as fs from 'fs-extra';
import * as _ from 'lodash';

import pathHelper from './helpers/pathHelper';
import { EmailOptions } from 'joi';

interface Config {
    port: number,
    isDevLocal: boolean,
    appVersion: string,
    rootUrl?: string,
    email?: any,
    auth?: any
}

let logConfig = true;
let config: Config = {
    port: 5000,
    isDevLocal: process.env.NODE_ENV !== 'production',
    appVersion: '0.0.1'
};

function tryReadConfigFile(path) {
    try {
        return fs.readJsonSync(path);
    } catch (err) {
        return {};
    }
}

let defaultFile = tryReadConfigFile(pathHelper.getDataRelative('config.json'));
_.merge(config, defaultFile);

let localFile = tryReadConfigFile(pathHelper.getLocalRelative('config.local.json'));
_.merge(config, localFile);

if (logConfig) {
    console.log('App configuration:');
    console.log(JSON.stringify(config, null, 2));
}

export default config;