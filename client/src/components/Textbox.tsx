import * as React from 'react';

interface TextboxProps {
    placeholder: string;
}
interface TextboxState { }

export default class Textbox extends React.Component<TextboxProps, TextboxState> {
    input: HTMLInputElement;

    public get value(): string {
        return this.input.value;
    }
    
    public set value(v: string) {
        this.input.value = v;
    }

    render() {
        return (
            <div className="cell input-control text text auto-size" data-role="input" style={{width: '100%'}}>
                <input type="text" ref={e => this.input = e as HTMLInputElement} placeholder={this.props.placeholder} />
                <button className="button helper-button clear">
                    <span className="mif-cross" />
                </button>
            </div>
        );
    }
    // example: get /login route data:
    // onClick=() => {
    //     fetch('/login')
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }
}
