import * as React from 'react';

import { OPTIONS_DEFAULT } from '../../helpers/constants';
import dataService from '../../services/dataService';
import { Row } from '../common/Table';
import TextBox from '../common/Textarea';
import Options, { OptionsParams } from '../Options';

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
            <Row className="workspace" cells={2}>
                <TextBox
                    ref={tb => {
                        this.textbox = tb as TextBox;
                    }}
                />
                <Options
                    onChange={this.handleOptionsChange}
                    defaultValues={this.state.options}
                />
            </Row>
        );
    }
}
