import * as React from 'react';

import { Metro } from '../helpers/metroHelper';
import authService from '../services/authService';

let form: {
    email: HTMLInputElement;
    password: HTMLInputElement;
    confirmPassword: HTMLInputElement;
} = {} as any;

function notifyOnErrorInput(input: any): any {
    const message = input.data('validateHint');
    Metro.notify('Error', message, 'alert');
}

async function submitRegster() {
    const { password, confirmPassword, email } = form;
    if (
        password.value &&
        confirmPassword.value &&
        password.value !== confirmPassword.value
    ) {
        Metro.notify('Error', 'Пароли не совпадают!', 'alert');
        return;
    }
    const user = {
        password: password.value,
        confirmPassword: confirmPassword.value,
        email: email.value
    };

    let response = await authService.signUp(user);
    if (response && response.message) {
        Metro.notify('Info', response.message, 'success');
    }
}

export default class HeaderRegister extends React.Component {
    constructor(props: any) {
        super(props);
        const globalscope = window as any;
        globalscope.notifyOnErrorInput = notifyOnErrorInput;
        globalscope.submitRegster = submitRegster;
    }

    render() {
        return (
            <div className="place-right">
                <a className="dropdown-toggle fg-white bg-hover-dark">
                    <span className="mif-key" /> Регистрация
                </a>
                <div
                    className="app-bar-drop-container bg-white fg-dark place-right"
                    data-role="dropdown"
                    data-no-close="true"
                >
                    <div className="padding20">
                        <form
                            data-role="validator"
                            data-on-error-input="notifyOnErrorInput"
                            data-show-error-hint="false"
                            data-show-required-state="false"
                            data-on-submit="submitRegster"
                            action={'javascript:void(0)'}
                        >
                            <h4 className="text-light">Регистрация</h4>
                            <div className="input-control text">
                                {/* <span className="mif-user prepend-icon" /> */}
                                <input
                                    data-validate-func="email"
                                    data-validate-hint="Неверный формат почты!"
                                    type="email"
                                    placeholder="Email"
                                    ref={el =>
                                        (form.email = el as HTMLInputElement)
                                    }
                                    // defaultValue="user@email.com"
                                />
                            </div>
                            <div
                                className="input-control password"
                                data-role="input"
                            >
                                {/* <span className="mif-lock prepend-icon" /> */}
                                <input
                                    data-validate-func="minlength"
                                    data-validate-arg="8"
                                    data-validate-hint="Минимальная длина пароля 8 символов!"
                                    type="password"
                                    placeholder="Пароль"
                                    ref={el =>
                                        (form.password = el as HTMLInputElement)
                                    }
                                    // defaultValue="p@s5_w0rd"
                                />
                                <button className="button helper-button reveal">
                                    <span className="mif-looks" />
                                </button>
                            </div>
                            <div
                                className="input-control password"
                                data-role="input"
                            >
                                {/* <span className="mif-lock prepend-icon" /> */}
                                <input
                                    type="password"
                                    placeholder="Повторите пароль"
                                    ref={el =>
                                        (form.confirmPassword = el as HTMLInputElement)
                                    }
                                    // defaultValue="p@s5_w0rd"
                                />
                                <button className="button helper-button reveal">
                                    <span className="mif-looks" />
                                </button>
                            </div>

                            <div className="form-actions flexbox ">
                                <button className="button flex-size-auto">
                                    ОК
                                </button>
                                <input
                                    type="reset"
                                    className="button alert"
                                    value="Отмена"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
