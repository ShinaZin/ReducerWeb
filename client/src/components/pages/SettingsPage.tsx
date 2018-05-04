import * as React from 'react';
import Options, { OptionsParams } from '../Options';
import TextBox from '../Textarea';
import { createHash } from 'crypto';

import Dictionary from '../Dictionary';
import dataService from '../../services/dataService';

export default class SettingsPage extends React.Component {

    dictionary = new Map<string, string>();

    constructor(props: any) {
        super(props);
        this.dictionary.set('короче', 'крч');
        this.dictionary.set('информ.без.', 'ИБ');
        this.dictionary.set('классификация', 'клсф-я');
    }

    private handleOptionsChange = (options: OptionsParams) => {
        console.log(options);
        const settings = {
            options: options
        };
        dataService.saveSettings(settings);
    };

    private handleDictChange = (dict: Map<string, string>) => {
        const arr = Array.from(dict, ([key, value]) => ({ key, value }));
        console.log(arr);
        const settings = {
            dict: arr
        };
        dataService.saveSettings(settings);
    };

    async componentDidMount() {
        const settings = await dataService.getSettings();
    }

    render() {
        return (
            <div className="row  cells3">
                <Dictionary dictionary={this.dictionary} onChange={this.handleDictChange} />
                <Options onChange={this.handleOptionsChange} />
            </div>
        );
    }
}