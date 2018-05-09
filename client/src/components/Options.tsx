import * as React from 'react';

import { colors, OPTIONS_DEFAULT } from '../helpers/constants';
import MetroSlider from './common/MetroSlider';
import Switch from './common/Switch';

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
        this.state = this.props.defaultValues || OPTIONS_DEFAULT;
    }

    private handleChangeDeleteSpaces = (checked: boolean) => {
        this.setState({ deleteSpacesAndTabs: checked });
        this.props.onChange(Object.assign(
            this.state, { deleteSpacesAndTabs: checked }
        ));
    };

    private handleChangeDeleteNewLines = (checked: boolean) => {
        this.setState({ deleteNewLineSymbols: checked });
        this.props.onChange(Object.assign(
            this.state, { deleteNewLineSymbols: checked }
        ));
    };

    private handleChangeVowelsDelete = (percent: number) => {
        this.setState({ vowelsDeletePercent: percent });
        this.props.onChange(Object.assign(
            this.state,
            { vowelsDeletePercent: percent }
        ));
    };

    private handleChangeMaxSyllables = (count: number) => {
        this.setState({ maxSyllables: count });
        this.props.onChange(Object.assign(
            this.state, { maxSyllables: count }
        ));
    };

    private handleChangeSyllablesToHyphen = (count: number) => {
        this.setState({ syllablesToHyphen: count });
        this.props.onChange(Object.assign(
            this.state, { syllablesToHyphen: count }
        ));
    };

    componentDidMount() {
        this.props.onChange(this.state);
    }

    componentWillReceiveProps(nextProps: OptionsProps) {
        if (nextProps.defaultValues === this.props.defaultValues) {
            return;
        }
        this.setState({ ...nextProps.defaultValues }); // не обновляется
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
