import * as React from 'react';

import MetroSlider from './MetroSlider';
import Switch from './Switch';

interface Props {
    onChange: Function;
}

export type OptionsParams = {
    maxSyllables?: number;
    vowelsDeletePercent?: number;
    deleteNewLineSymbols?: boolean;
    deleteSpacesAndTabs?: boolean;
    syllablesToHyphen?: number;
};

const colors = {
    MAIN_COLOR: 'green'
};

export default class Options extends React.Component<Props> {
    public optionsParams: OptionsParams;
    constructor(props: any) {
        super(props);
        this.optionsParams = {
            maxSyllables: 3,
            vowelsDeletePercent: 0,
            deleteNewLineSymbols: false,
            deleteSpacesAndTabs: false,
            syllablesToHyphen: 5
        };
    }

    private handleChangeDeleteSpaces = (checked: boolean) => {
        this.optionsParams.deleteSpacesAndTabs = checked;
        this.props.onChange(this.optionsParams);
    };

    private handleChangeDeleteNewLines = (checked: boolean) => {
        this.optionsParams.deleteNewLineSymbols = checked;
        this.props.onChange(this.optionsParams);
    };

    private handleChangeVowelsDelete = (percent: number) => {
        this.optionsParams.vowelsDeletePercent = percent;
        this.props.onChange(this.optionsParams);
    };

    private handleChangeMaxSyllables = (count: number) => {
        this.optionsParams.maxSyllables = count;
        this.props.onChange(this.optionsParams);
    };

    private handleChangeSyllablesToHyphen = (count: number) => {
        this.optionsParams.syllablesToHyphen = count;
        this.props.onChange(this.optionsParams);
    };

    render() {
        return (
            <div
                className="options cell auto-size size-p30 padding10 no-padding-top"
            >
                <Switch
                    label={'Удалять лишние пробелы'}
                    onChange={this.handleChangeDeleteSpaces}
                    checked={true}
                />
                <Switch
                    label={'Удалять переводы строк'}
                    onChange={this.handleChangeDeleteNewLines}
                />

                <MetroSlider
                    label={'Процент удаляемых гласных'}
                    value={15}
                    color={colors.MAIN_COLOR}
                    onChange={this.handleChangeVowelsDelete}
                />
                <MetroSlider
                    label={'Максимум слогов'}
                    value={3}
                    minValue={1}
                    maxValue={10}
                    step={1}
                    color={colors.MAIN_COLOR}
                    onChange={this.handleChangeMaxSyllables}
                />
                <MetroSlider
                    label={'Количество слогов для сокращения через дефис'}
                    value={4}
                    minValue={3}
                    maxValue={15}
                    step={1}
                    color={colors.MAIN_COLOR}
                    onChange={this.handleChangeSyllablesToHyphen}
                />
            </div>
        );
    }
}
