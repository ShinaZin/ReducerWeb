import * as React from 'react';

import dataService from '../../services/dataService';
import Options, { OptionsParams } from '../Options';
import TextBox from '../Textarea';
import { OPTIONS_DEFAULT } from '../../helpers/constants';

interface MainPageState {
    options: OptionsParams;
}

export default class MainPage extends React.Component<{}, MainPageState> {
    private textbox: TextBox;

    constructor(props: any) {
        super(props);
        this.state = { options: OPTIONS_DEFAULT };
    }

    handleOptionsChange = (op: OptionsParams) => {
        this.textbox.setState({ optionsParams: op });
    };

    async componentDidMount() {
        const data = (await dataService.getSettings()) as any[];
        if (!data) {
            return;
        }
        const [settings] = data;
        const { dictionary, options } = settings || this.state;
        this.setState({ options });
    }

    render() {
        return (
            <div className="workspace row cells2 ">
                <TextBox
                    ref={tb => {
                        this.textbox = tb as TextBox;
                    }}
                />
                <Options onChange={this.handleOptionsChange} defaultValues={this.state.options} />
            </div>
        );
    }
}