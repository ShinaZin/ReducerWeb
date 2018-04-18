import * as $ from 'jquery';
import * as React from 'react';
import authService from '../services/authService';

let form: {
    email: HTMLInputElement,
    password: HTMLInputElement,
    confirmPassword: HTMLInputElement
} = {} as any;

function notifyOnErrorInput(input: any): any {
    const message = input.data('validateHint');
    ($ as any).Notify({
        caption: 'Error',
        content: message,
        type: 'alert'
    });
}

async function submit() {
    const { password, confirmPassword, email } = form;
    if (password.value && confirmPassword.value &&
        password.value !== confirmPassword.value) {
        ($ as any).Notify({
            caption: 'Error',
            content: 'Пароли не совпадают!',
            type: 'alert'
        });
        return;
    }
    const user = {
        password: password.value,
        confirmPassword: confirmPassword.value,
        email: email.value
    };
    
    let response = await authService.signUp(user);

}

export default class HeaderRegister extends React.Component {
    constructor(props: any) {
        super(props);
        const globalscope = (window) as any;
        globalscope.notifyOnErrorInput = notifyOnErrorInput;
        globalscope.submit = submit;
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
                            data-on-submit="submit"
                            action={'javascript:void(0)'}
                        >
                            <h4 className="text-light">Регистрация</h4>
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
                                    data-validate-func="minlength"
                                    data-validate-arg="8"
                                    data-validate-hint="Минимальная длина пароля 8 символов!"
                                    type="password"
                                    placeholder="Пароль"
                                    ref={el => form.password = el as HTMLInputElement}
                                    defaultValue="p@s5_w0rd"
                                />
                                <button className="button helper-button reveal">
                                    <span className="mif-looks" />
                                </button>
                            </div>
                            <div className="input-control password" data-role="input">
                                <span className="mif-lock prepend-icon" />
                                <input
                                    type="password"
                                    placeholder="Повторите пароль"
                                    ref={el => form.confirmPassword = el as HTMLInputElement}
                                    defaultValue="p@s5_w0rd"
                                />
                                <button className="button helper-button reveal">
                                    <span className="mif-looks" />
                                </button>
                            </div>

                            <div className="form-actions flexbox ">
                                <button className="button flex-size-auto">ОК</button>
                                <input type="reset" className="button alert" value="Отмена" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
