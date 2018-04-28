import * as React from 'react';
import { Link } from 'react-router-dom';

import authService from '../services/authService';
import dataService, { UserData } from '../services/dataService';
import HeaderLogin from './HeaderLogin';
import HeaderRegister from './HeaderRegister';
import HeaderUser from './HeaderUser';

interface HeaderState {
    user: UserData;
}

export default class Header extends React.Component<{}, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = { user: null };
    }

    handleLogin = () => {
        dataService
            .getCurrentUser()
            .then(userData => this.setState({ user: userData }));
    };

    handleLogout = () => {
        authService.saveToken(null);
        dataService
        .getCurrentUser()
        .then(userData => this.setState({ user: userData }));
        document.location.href = '/';
    };

    componentDidMount() {
        this.handleLogin();
    }

    render() {
        const isLoggedIn = this.state.user ? true : false;
        return (
            <header className="app-bar darcula" data-role="appbar">
                <Link to="/" className="app-bar-element text-bold">
                    REDUCER
                    {/* <span className="icon mif-spinner3 mif-ani-spin" /> */}
                    {/* <img src={logo} alt="Logo" height="25%" width="25%" /> */}
                </Link>
                <div className="app-bar-pullbutton automatic" />
                <ul className="app-bar-menu place-right" data-flexdirection="reverse">
                    {isLoggedIn ? (
                        <React.Fragment>
                            <li>
                                <Link
                                    to="/settings"
                                    className="app-bar-element"
                                >
                                    Настройки
                                </Link>
                            </li>
                            <li>
                                <HeaderUser onLogout={this.handleLogout} user={this.state.user}/>
                            </li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li>
                                <HeaderRegister />
                            </li>
                            <li>
                                <HeaderLogin onLogin={this.handleLogin} />
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </header>
        );
    }
}
