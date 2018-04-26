import * as React from 'react';
import { Link } from 'react-router-dom';
import HeaderLogin from './HeaderLogin';
import HeaderRegister from './HeaderRegister';
import logo from '../img/logo.png';
import dataService from '../services/dataService';
export default class Header extends React.Component {
    render() {
        const user = dataService.getCurrentUser();
        user.then(
            (data: { email: string, profile: any }) => console.log(data)
        )

        const isLoggedIn = false;//
        return (
            // fixed-top
            <header className="app-bar darcula" data-role="appbar">
                <Link to="/" className="app-bar-element text-bold">
                    REDU
                    <span className="icon mif-spinner3 mif-ani-spin" />
                    ER
                    {/* <img src={logo} alt="Logo" height="25%" width="25%" /> */}
                </Link>
                <div className="app-bar-pullbutton automatic" />
                <ul className="app-bar-menu place-right ">
                    {
                        isLoggedIn
                            ? <li><Link to="/settings" className="app-bar-element">Настройки</Link></li>
                            : <React.Fragment>
                                <li><HeaderRegister /></li>
                                <li><HeaderLogin /></li>
                            </React.Fragment>

                    }
                </ul>
            </header>
        );
    }
}
