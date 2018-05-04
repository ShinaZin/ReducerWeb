import * as React from 'react';
import { Link } from 'react-router-dom';

import { UserData } from '../services/dataService';

interface HeaderUserProps {
    onLogout: any;
    user: UserData;
}

export default class HeaderUser extends React.Component<HeaderUserProps> {
    constructor(props: HeaderUserProps) {
        super(props);
    }

    render() {
        return (
            <div className="app-bar-element place-right">
                <a className="dropdown-toggle fg-white">
                    <span className="mif-user" /> {this.props.user.email}
                </a>
                <ul
                    className="d-menu bg-white fg-dark place-right"
                    data-role="dropdown"
                >
                    <li>
                        <Link to="/settings">Настройки</Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <a onClick={this.props.onLogout}>Выход</a>
                    </li>
                </ul>
            </div>
        );
    }
}
