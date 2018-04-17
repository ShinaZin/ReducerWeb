import * as React from 'react';
import Options, { OptionsParams } from '../Options';
import TextBox from '../Textarea';

export default class MainPage extends React.Component {
    private textbox: TextBox;
    handleOptionsChange = (op: OptionsParams) => {
        this.textbox.setState({ optionsParams: op });
    };

    render() {
        return (
            <div className="workspace row cells2 ">
                <TextBox
                    ref={tb => {
                        this.textbox = tb as TextBox;
                    }}
                />
                <Options onChange={this.handleOptionsChange} />
            </div>
        );
    }
}