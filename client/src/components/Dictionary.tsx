import * as React from 'react';

import Textbox from './Textbox';

interface DictionaryProps {
    dictionary: Map<string, string>;
}
interface DictionaryState {
    dictionary: Map<string, string>;
}
export default class Dictionary extends React.Component<DictionaryProps, DictionaryState> {
    inputOld: Textbox;
    inputNew: Textbox;

    constructor(props: DictionaryProps) {
        super(props);
        this.state = { dictionary: props.dictionary };
    }

    handleDeleteClick = () => {
        const valueOld = this.inputOld.value;
        let newDictionary = this.state.dictionary;
        newDictionary.delete(valueOld);
        this.setState({ dictionary: newDictionary });

    }

    handleAddClick = () => {
        const valueOld = this.inputOld.value;
        const valueNew = this.inputNew.value;
        const newDictionary = this.state.dictionary.set(valueOld, valueNew);
        this.setState({ dictionary: newDictionary });
    }

    handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const match = e.target.value.match(/(.*):(.*)/);
        if (match && match.length >= 3) {
            this.inputOld.value = match[1];
            this.inputNew.value = match[2];
        }
    }

    render() {
        return ([
            // tslint:disable-next-line:jsx-wrap-multiline
            <div
                className={
                    'cell size-p40 input-control select multiple full-size ' +
                    'padding10 no-padding-top '
                }
                style={{ minHeight: 200, maxHeight: 400 }}
                key="1"
            >
                <select multiple onChange={this.handleListChange}>
                    {
                        Array.from(this.state.dictionary, ([key, value]) => ({ key, value }))
                            .map(el => <option key={el.key}>{`${el.key}: ${el.value}`}</option>)
                    }
                </select>
            </div>,
            // tslint:disable-next-line:jsx-wrap-multiline
            <div className="cell auto-size  padding10 no-padding-top" key="2">
                <div className="flex-grid">

                    <div className="row cells1">
                        <Textbox placeholder="Исходное слово" ref={e => this.inputOld = e as Textbox} />
                    </div>

                    <div className="row cells1">
                        <Textbox placeholder="Новое слово" ref={e => this.inputNew = e as Textbox} />
                    </div>

                    <div className="row cells2 flex-content-sb">
                        <button className="button cell auto-size" onClick={this.handleAddClick}>Добавить</button>
                        <button className="button cell auto-size" onClick={this.handleDeleteClick}>Удалить</button>
                    </div>

                </div>
            </div>
        ]
        );
    }
}
