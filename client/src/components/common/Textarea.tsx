import * as React from 'react';

import { colors } from '../../helpers/constants';
import { getFishText } from '../../helpers/fishtextHelper';
import { OptionsParams } from '../Options';
import Reducer from '../reducerClasses/Reducer';
import { Row } from './Table';

interface Props {}
interface States {
    text: string;
    optionsParams: OptionsParams;
}

export default class TextBox extends React.Component<Props, States> {
    private textarea: HTMLTextAreaElement;
    constructor(props: Props) {
        super(props);
        this.state = { text: '', optionsParams: {} };
    }

    render() {
        return (
            <div
                className="input-control textarea auto-size full-size cell"
                data-role="input"
                data-text-max-height="300"
            >
                <textarea
                    ref={e => (this.textarea = e as HTMLTextAreaElement)}
                    style={{
                        resize: 'none',
                        height: '300px',
                        overflowY: 'auto'
                    }}
                    placeholder="Введите текст для сокращения"
                    value={this.state.text}
                    onChange={this.handleChange}
                />

                <Row cellAutoSize>
                    <input
                        type="button"
                        className={
                            'cell button fg-white bg-' + colors.METRO_MAIN
                        }
                        value="Сократить"
                        onClick={this.handleClickReduce}
                    />
                    <input
                        type="button"
                        className="cell button"
                        value="Очистить"
                        onClick={this.handleClickClear}
                    />
                    <input
                        type="button"
                        className="cell button"
                        value="Пример"
                        onClick={this.handleClickExample}
                    />
                </Row>
            </div>
        );
    }

    private handleClickClear = () => {
        this.setState({ text: '' });
        this.textarea.value = '';
    };

    private handleClickReduce = () => {
        let reducer = new Reducer(this.state.optionsParams);
        let reducedText = reducer.ReduceTheText(this.state.text);
        this.setState({ text: reducedText });
    };

    private handleChange = (e: any) => {
        this.setState({ text: e.target.value });
    };

    private handleClickExample = async (e: any) => {
        this.setState({ text: await getFishText(2) });
    };
}
