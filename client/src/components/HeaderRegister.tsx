import * as $ from 'jquery';
import * as React from 'react';

function notifyOnErrorInput(input: any): any {
    const message = input.data('validateHint');
    ($ as any).Notify({
        caption: 'Error',
        content: message,
        type: 'alert'
    });
}

export default class HeaderRegister extends React.Component {
    constructor(props: any) {
        super(props);
        const globalscope = (window) as any;
        globalscope.notifyOnErrorInput = notifyOnErrorInput;
    }

    render() {
        return (
            <div className="app-bar-element place-right">
                <a className="dropdown-toggle fg-white">
                    <span className="mif-key" /> Регистрация
                    </a>
                <div
                    className="app-bar-drop-container bg-white fg-dark place-right"
                    data-role="dropdown"
                    data-no-close="true"
                    style={{ display: 'none' }}
                >
                    <div className="padding20">
                        <form
                            data-role="validator"
                            data-on-error-input="notifyOnErrorInput"
                            data-show-error-hint="false"
                            data-show-required-state="false"
                        >
                            <h4 className="text-light">Регистрация</h4>
                            <div className="input-control text">
                                <span className="mif-user prepend-icon" />
                                <input
                                    data-validate-func="email"
                                    data-validate-hint="Неверный формат почты!"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="input-control password" data-role="input">
                                <span className="mif-lock prepend-icon" />
                                <input
                                    data-validate-func="minlength"
                                    data-validate-arg="8"
                                    data-validate-hint="Минимальная длина пароля 8 символов!"
                                    type="password"
                                    placeholder="Пароль"
                                />
                                <button className="button helper-button reveal">
                                    <span className="mif-looks" />
                                </button>
                            </div>
                            <div className="input-control password" data-role="input">
                                <span className="mif-lock prepend-icon" />
                                <input type="password" placeholder="Повторите пароль" />
                                <button className="button helper-button reveal">
                                    <span className="mif-looks" />
                                </button>
                            </div>

                            <div className="form-actions flexbox ">
                                <button className="button flex-size-auto">Готово</button>
                                <input type="reset" className="button alert" value="Отмена" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
