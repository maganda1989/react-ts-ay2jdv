import logo from './logo.svg';
import './App.css';
import { config } from './config';
import { PublicClientApplication } from '@azure/msal-browser';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenthicated: false,
      user: {},
    };
    this.login = this.login.bind(this);
    // Initialize the MSAL application object
    this.PublicClientApplication = new PublicClientApplication({
      auth: {
        clientid: '6ae3e3c9-a978-43fe-a8f9-5ef82163474b',
        redirectUri: config.redirectUri,
        authority: config.authority,
      },
      cache: {
        cachelocation: 'sessionStorage',
        storeAuthStateInCookie: true,
      },
    });
  }
  async login() {
    try {
      //Login via popup
      await this.PublicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account',
      });
      this.setStateState({ isAuthenthicated: true });
    } catch (err) {}

    this.setState({
      isAuthenthicated: false,
      User: {},
      error: 'err',
    });
  }

  logout() {
    this.PublicClientApplication.logoutPopup();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.isAuthenthicated ? (
            <p>Successful logged in</p>
          ) : (
            <p>
              <button onClick={() => this.login()}>Login</button>
            </p>
          )}
        </header>
      </div>
    );
  }
}
export default App;
