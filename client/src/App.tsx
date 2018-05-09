import 'metro-dist/css/metro-icons.min.css';
import 'metro-dist/css/metro-responsive.min.css';
import 'metro-dist/css/metro-schemes.min.css';
import 'metro-dist/css/metro.css';
import 'metro-dist/js/metro.js';

import * as React from 'react';
import { Route, Switch } from 'react-router';

import Header from './components/Header';
import ActivationPage from './components/pages/auth/ActivationPage';
import MainPageAsync from './components/pages/MainPageAsync';
import SettingsPageAsync from './components/pages/SettingsPageAsync';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <main className="container padding30 flex-grid">
                    <Switch>
                        <Route exact path="/" component={MainPageAsync} />
                        <Route exact path="/settings" component={SettingsPageAsync} />
                        <Route
                            path="/activate/:token"
                            component={(props: any) => (
                                <ActivationPage {...props} />
                            )}
                        />
                    </Switch>
                </main>
            </div>
        );
    }
}
