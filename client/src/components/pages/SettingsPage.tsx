import * as React from 'react';
import Options, { OptionsParams } from '../Options';
import TextBox from '../Textarea';
import { createHash } from 'crypto';

import Dictionary from '../Dictionary';

export default class SettingsPage extends React.Component {
    dictionary = new Map<string, string>();

    constructor(props: any) {
        super(props);
        this.dictionary.set('короче', 'крч');
        this.dictionary.set('информ.без.', 'ИБ');
        this.dictionary.set('классификация', 'клсф-я');
    }

    handleOptionsChange = (op: OptionsParams) => {
        console.log(op);
    };

    render() {
        return (
            <div className="row  cells3">
                <Dictionary dictionary={this.dictionary} />
                <Options onChange={this.handleOptionsChange} />
            </div>
        );
    }
}