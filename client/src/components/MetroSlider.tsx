import 'rc-slider/assets/index.css';

import Slider, { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import * as React from 'react';

interface SliderProps {
    label: string;
    defaultValue: number;
    minValue?: number;
    maxValue?: number;
    step?: number;
    color?: string;
    onChange: Function;
}
interface SliderState {
    value: number;
}

const handle = (props: any) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

export default class MetroSlider extends React.Component<
    SliderProps,
    SliderState
    > {
    constructor(props: any) {
        super(props);
        this.state = { value: props.value };
    }
    public onSlideChange = (value: any) => {
        this.setState({ value: value });
        this.props.onChange(value);
    };
    render() {
        return (
            <div>
                <h5>{this.props.label}</h5>
                <Slider
                    min={this.props.minValue}
                    max={this.props.maxValue}
                    step={this.props.step}
                    included={true}
                    onAfterChange={this.onSlideChange}
                    defaultValue={this.props.defaultValue}
                    trackStyle={{
                        backgroundColor: this.props.color,
                        height: 5
                    }}
                    railStyle={{ borderRadius: 0 }}
                    handleStyle={{
                        height: 14,
                        width: 14,
                        marginLeft: -3,
                        marginTop: -5,
                        backgroundColor: this.props.color,
                        borderRadius: 0,
                        borderColor: this.props.color,
                        boxShadow: `0 0 0 ${this.props.color}`
                    }}
                    handle={handle}
                />
            </div>
        );
    }
}
