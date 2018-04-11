import React, { Component } from 'react';
import autoBind from 'react-autobind';

import dataService from './services/dataService';
import ListComponent from './components/ListComponent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        message: null
    };

    autoBind(this);
  }

  componentDidMount() {
      this.getMessage();
  }

  async getMessage() {
      let message = await dataService.getMessage();

      this.setState({
          message
      });
  }
  render() {
    let displayMessage = this.state.message ? this.state.message : 'Hello World from client!';

    return (
      <div className="app">
          <div className="app-header">
              <img src={logo} className="app-logo" alt="logo" />
              <h2>Welcome to React</h2>
          </div>

          <div className="app-intro">
              <h2>Server message</h2>

              <div>Message from server: <b>{displayMessage}</b></div>

              <br/>

              <h2>Items list</h2>

              <ListComponent />
          </div>
      </div>
    );
  }
}

export default App;

