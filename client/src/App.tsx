import 'metro-dist/css/metro-icons.min.css';
import 'metro-dist/css/metro-responsive.min.css';
import 'metro-dist/css/metro-schemes.min.css';
import 'metro-dist/css/metro.css';
import 'metro-dist/js/metro.js';

import * as React from 'react';
import { Route, Switch } from 'react-router';

import Header from './components/Header';
import MainPage from './components/pages/MainPage';
import SettingsPage from './components/pages/SettingsPage';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <main className="container padding30 flex-grid">
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/settings" component={SettingsPage} />
                    </Switch>
                </main>
            </div>
        );
    }
}
