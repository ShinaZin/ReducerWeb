import * as React from 'react';

import Textbox from './Textbox';
import { mapToArray } from '../helpers/commonHelper';
import { colors } from '../helpers/constants';

interface DictionaryProps {
    defaultValues: Map<string, string>;
    onChange: Function;
    onSave: (event: any) => void;
}
interface DictionaryState {
    dictionary: Map<string, string>;
}
export default class Dictionary extends React.Component<
    DictionaryProps,
    DictionaryState
> {
    inputOld: Textbox;
    inputNew: Textbox;

    constructor(props: DictionaryProps) {
        super(props);
        this.state = { dictionary: props.defaultValues };
    }

    private handleDeleteClick = () => {
        const valueOld = this.inputOld.value;
        const newDictionary = this.state.dictionary;
        newDictionary.delete(valueOld);
        this.setState({ dictionary: newDictionary });
        this.props.onChange(newDictionary);
    };

    private handleAddClick = () => {
        const valueOld = this.inputOld.value;
        const valueNew = this.inputNew.value;
        const newDictionary = this.state.dictionary.set(valueOld, valueNew);
        this.setState({ dictionary: newDictionary });
        this.props.onChange(newDictionary);
    };

    private handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const match = e.target.value.match(/(.*):(.*)/);
        if (match && match.length >= 3) {
            this.inputOld.value = match[1];
            this.inputNew.value = match[2];
        }
    };

    componentWillReceiveProps(nextProps: DictionaryProps) {
        if (nextProps.defaultValues === this.props.defaultValues) {
            return;
        }
        this.setState({
            dictionary: nextProps.defaultValues
        });
    }

    componentDidMount() {
        this.props.onChange(this.state.dictionary);
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className={
                        'cell size-p40 input-control select multiple full-size ' +
                        'padding10 no-padding-top '
                    }
                    style={{ minHeight: 200, maxHeight: 400 }}
                >
                    <select multiple onChange={this.handleListChange}>
                        {mapToArray(this.state.dictionary).map(el => (
                            <option key={el.key}>{`${el.key}: ${
                                el.value
                            }`}</option>
                        ))}
                    </select>
                </div>
                <div className="cell auto-size  padding10 no-padding-top">
                    <div className="flex-grid">
                        <div className="row cells1">
                            <Textbox
                                placeholder="Исходное слово"
                                ref={e => (this.inputOld = e as Textbox)}
                            />
                        </div>

                        <div className="row cells1">
                            <Textbox
                                placeholder="Новое слово"
                                ref={e => (this.inputNew = e as Textbox)}
                            />
                        </div>

                        <div className="row cells2 flex-content-sb">
                            <button
                                className="button cell auto-size"
                                onClick={this.handleAddClick}
                            >
                                Добавить
                            </button>
                            <button
                                className="button cell auto-size"
                                onClick={this.handleDeleteClick}
                            >
                                Удалить
                            </button>
                        </div>
                        <div className="row cells1 flex-content-sb">
                            <button
                                className={
                                    'button cell auto-size  fg-white bg-' +
                                    colors.METRO_MAIN
                                }
                                onClick={this.props.onSave}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
