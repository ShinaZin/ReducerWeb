import * as React from 'react';

import { colors } from '../helpers/constants';
import MetroSlider from './MetroSlider';
import Switch from './Switch';

export type OptionsParams = {
    maxSyllables?: number;
    vowelsDeletePercent?: number;
    deleteNewLineSymbols?: boolean;
    deleteSpacesAndTabs?: boolean;
    syllablesToHyphen?: number;
};

interface OptionsProps {
    onChange: Function;
    defaultValues?: OptionsParams;
}

interface OptionsState {
    maxSyllables?: number;
    vowelsDeletePercent?: number;
    deleteNewLineSymbols?: boolean;
    deleteSpacesAndTabs?: boolean;
    syllablesToHyphen?: number;
}

export default class Options extends React.Component<
    OptionsProps,
    OptionsState
> {
    constructor(props: any) {
        super(props);
        this.state = this.props.defaultValues || {
            maxSyllables: 3,
            vowelsDeletePercent: 15,
            deleteNewLineSymbols: false,
            deleteSpacesAndTabs: true,
            syllablesToHyphen: 4
        };
    }

    private handleChangeDeleteSpaces = (checked: boolean) => {
        this.setState({ deleteSpacesAndTabs: checked });
        this.props.onChange(this.state); // не обновляется
    };

    private handleChangeDeleteNewLines = (checked: boolean) => {
        this.setState({ deleteNewLineSymbols: checked });
        this.props.onChange(this.state);
    };

    private handleChangeVowelsDelete = (percent: number) => {
        this.setState({ vowelsDeletePercent: percent });
        this.props.onChange(this.state);
    };

    private handleChangeMaxSyllables = (count: number) => {
        this.setState({ maxSyllables: count });
        this.props.onChange(this.state);
    };

    private handleChangeSyllablesToHyphen = (count: number) => {
        this.setState({ syllablesToHyphen: count });
        this.props.onChange(this.state);
    };

    componentDidMount() {
        this.props.onChange(this.state);
    }

    componentWillReceiveProps(nextProps: OptionsProps) {
        if (nextProps.defaultValues === this.props.defaultValues) {
            return;
        }
        // console.log({...nextProps.defaultValues});
        this.setState({ ...nextProps.defaultValues }); // не обновляется
        // this.render();
    }

    render() {
        return (
            <div className="options cell auto-size size-p30 padding10 no-padding-top">
                <Switch
                    label={'Удалять лишние пробелы'}
                    onChange={this.handleChangeDeleteSpaces}
                    checked={this.state.deleteSpacesAndTabs}
                />
                <Switch
                    label={'Удалять переводы строк'}
                    onChange={this.handleChangeDeleteNewLines}
                    checked={this.state.deleteNewLineSymbols}
                />

                <MetroSlider
                    label={'Процент удаляемых гласных'}
                    defaultValue={this.state.vowelsDeletePercent}
                    color={colors.MAIN}
                    onChange={this.handleChangeVowelsDelete}
                />
                <MetroSlider
                    label={'Максимум слогов'}
                    defaultValue={this.state.maxSyllables}
                    minValue={1}
                    maxValue={10}
                    step={1}
                    color={colors.MAIN}
                    onChange={this.handleChangeMaxSyllables}
                />
                <MetroSlider
                    label={'Количество слогов для сокращения через дефис'}
                    defaultValue={this.state.syllablesToHyphen}
                    minValue={3}
                    maxValue={15}
                    step={1}
                    color={colors.MAIN}
                    onChange={this.handleChangeSyllablesToHyphen}
                />
            </div>
        );
    }
}
