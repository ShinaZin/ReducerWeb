import * as React from 'react';

import { colors } from '../helpers/constants';

interface Props {
    label: string;
    checked?: boolean;
    onChange: Function;
}

interface State {
    checked: boolean;
}

export default class Switch extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { checked: this.props.checked || false };
    }

    private toggleChange = (e: any) => {
        this.setState((prevState, props) => {
            this.props.onChange(!prevState.checked);
            return { checked: !this.state.checked };
        });
    };

    render() {
        return (
            <div>
                <h5>{this.props.label}</h5>
                <label className="switch-original ">
                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        onChange={this.toggleChange}
                        
                    />
                    <span 
                        className="check"
                        style={this.state.checked ? { background: colors.MAIN } : {}}
                    />
                </label>
            </div>
        );
    }
}
