import * as React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

let form: {
    email: HTMLInputElement,
    password: HTMLInputElement,
    remember?: boolean
} = {} as any;

async function submitLogin() {
    const { password, email } = form;
    const user = {
        password: password.value,
        email: email.value
    };

    let response = await authService.login(user);
    if (response && response.token) {
        authService.saveToken(response.token);
    }
}

export default class HeaderLogin extends React.Component {
    constructor(props: any) {
        super(props);
        const globalscope = (window) as any;
        globalscope.submitLogin = submitLogin;
    }

    render() {
        return (
            <div className="app-bar-element place-right">
                <a className="dropdown-toggle fg-white">
                    <span className="mif-enter" /> Вход
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
                            data-on-submit="submitLogin"
                            action={'javascript:void(0)'}
                        >
                            <h4 className="text-light">Войти на сайт...</h4>
                            <div className="input-control text">
                                <span className="mif-user prepend-icon" />
                                <input
                                    data-validate-func="email"
                                    data-validate-hint="Неверный формат почты!"
                                    type="text"
                                    placeholder="Email"
                                    ref={el => form.email = el as HTMLInputElement}
                                    defaultValue="user@email.com"
                                    
                                />
                            </div>
                            <div className="input-control password" data-role="input">
                                <span className="mif-lock prepend-icon" />
                                <input
                                    data-validate-func="required"
                                    data-validate-hint="Введите пароль!"
                                    type="password"
                                    placeholder="Пароль"
                                    ref={el => form.password = el as HTMLInputElement}
                                    defaultValue="p@s5_w0rd"
                                />
                                <button className="button helper-button reveal">
                                    <span className="mif-looks" />
                                </button>
                            </div>
                            <label className="input-control checkbox small-check">
                                <input type="checkbox" />
                                <span className="check" />
                                <span className="caption">
                                    Запомнить меня
                                </span>
                            </label>
                            <div className="form-actions flexbox ">
                                <button className="button flex-size-auto">Готово</button>
                                <input type="reset" className="button alert" value="Отмена"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}