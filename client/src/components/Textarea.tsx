import * as React from 'react';

import { OptionsParams } from './Options';
import Reducer from './reducerClasses/Reducer';

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
                    onChange={this.handleChangeHandler}
                />

                <div className="row cell-auto-size">
                    <input
                        type="button"
                        className="cell button bg-emerald fg-white"
                        value="Сократить"
                        onClick={this.handleClickReduce}
                    />
                    <input
                        type="button"
                        className="cell button"
                        value="Очистить"
                        onClick={this.handleClickClear}
                    />
                </div>
            </div>
        );
    }
    private handleClickClear = () => {
        this.textarea.value = '';
    };

    private handleClickReduce = () => {
        let reducer = new Reducer(this.state.optionsParams);
        let reducedText = reducer.ReduceTheText(this.state.text);
        this.setState({ text: reducedText });
    };

    private handleChangeHandler = (e: any) => {
        this.setState({ text: e.target.value });
    };
}
