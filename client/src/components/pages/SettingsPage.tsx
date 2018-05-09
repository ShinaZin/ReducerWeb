import * as React from 'react';

import { mapToArray, arrayToMap } from '../../helpers/commonHelper';
import dataService from '../../services/dataService';
import Dictionary from '../Dictionary';
import Options, { OptionsParams } from '../Options';
import { OPTIONS_DEFAULT } from '../../helpers/constants';
import { Row } from '../common/Table';

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
            options: OPTIONS_DEFAULT
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
        if (!data) {
            return;
        }
        const [settings] = data;
        const { dictionary, options } = settings || this.state;
        const mapDictionary = arrayToMap(dictionary);
        this.setState({ dictionary: mapDictionary, options });
    }

    render() {
        return (
            <Row cells={3}>
                <Dictionary
                    defaultValues={this.state.dictionary}
                    onChange={this.handleDictChange}
                    onSave={this.handleSaveClick}
                />
                <Options
                    onChange={this.handleOptionsChange}
                    defaultValues={this.state.options}
                />
            </Row>
        );
    }
}
