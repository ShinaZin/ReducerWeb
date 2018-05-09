import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Metro } from '../helpers/metroHelper';
import authService from '../services/authService';
import dataService, { UserData } from '../services/dataService';
import HeaderLogin from './HeaderLogin';
import HeaderRegister from './HeaderRegister';
import HeaderUser from './HeaderUser';

interface HeaderState {
    user: UserData;
}

class Header extends React.Component<{}, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = { user: null };
    }

    handleLogin = () => {
        dataService.getCurrentUser().then(userData => {
            this.setState({ user: userData });
            if (!userData) {
                Metro.notify(
                    'Info',
                    'login to access to full version of app',
                    'info',
                    true
                );
            }
        });
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
                <Link to="/" className="app-bar-element branding">
                    REDUCER
                    {/* <img src={logo} alt="Logo" height="25%" width="25%" /> */}
                </Link>
                <span className="app-bar-divider" />
                {isLoggedIn ? (
                    <HeaderUser
                        onLogout={this.handleLogout}
                        user={this.state.user}
                    />
                ) : (
                    <div className="app-bar-element place-right">
                        <a className="dropdown-toggle fg-white">
                            <span className="mif-user" /> Гость
                        </a>
                        <ul
                            className="d-menu bg-darkGray place-right"
                            data-role="dropdown"
                        >
                            <li>
                                <HeaderRegister />
                            </li>
                            <li>
                                <HeaderLogin onLogin={this.handleLogin} />
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        );
    }
}

export default withRouter(Header);
