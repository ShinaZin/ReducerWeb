import * as React from 'react';

import { mapToArray, arrayToMap } from '../../helpers/commonHelper';
import dataService from '../../services/dataService';
import Dictionary from '../Dictionary';
import Options, { OptionsParams } from '../Options';

interface SettingsPageState {
    dictionary: Map<string, string>;
    options: OptionsParams;
}

export default class SettingsPage extends React.Component<
    {},
    SettingsPageState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            dictionary: new Map(),
            options: null
        };
    }

    private handleOptionsChange = (options: OptionsParams) => {
        this.setState({ options });
    };

    private handleDictChange = (dictionary: Map<string, string>) => {
        this.setState({ dictionary });
    };

    private handleSaveClick = () => {
        const { dictionary, options } = this.state;
        const arrayDict = mapToArray(dictionary);
        const settings = {
            dictionary: arrayDict,
            options
        };
        dataService.saveSettings(settings);
    };

    async componentDidMount() {
        const data = (await dataService.getSettings()) as any[];
        const [settings, ...rest] = data.reverse();
        const { dictionary, options } = settings || {
            dictionary: new Map(),
            options: null
        };
        const mapDictionary = arrayToMap(dictionary);
        this.setState({ dictionary: mapDictionary, options });
        // console.log(settings);
    }

    render() {
        return (
            <div className="row  cells3">
                <Dictionary
                    defaultValues={this.state.dictionary}
                    onChange={this.handleDictChange}
                    onSave={this.handleSaveClick}
                />
                <Options
                    onChange={this.handleOptionsChange}
                    defaultValues={this.state.options}
                />
            </div>
        );
    }
}
