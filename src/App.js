import React, { Component, Fragment } from 'react';
import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import hash from './hash';
import TestQuiz from './Components/TestQuiz';
import Recommendation from './Components/Recommendation';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Typed from 'react-typed';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      recommendation: [],
    };
    this.getRecommendation = this.getRecommendation.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
    }
  }

  getRecommendation(token, seed) {
    console.log('was getRec ever called????');
    $.ajax({
      url: `https://api.spotify.com/v1/recommendations?market=ES&seed_genres=${
        seed.genre
      }&limit=10`,
      type: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      success: data => {
        console.log('are there recommendations?', data);
        this.setState({
          recommendation: data.tdracks,
        });
      },
    });
  }

  render() {
    console.log('checking state', this.state);
    return (
      <Router>
        <body className="App-body">
          {!this.state.token ? (
            <Fragment>
              <div className="login-cover-photo">
                <img
                  src="https://cdn.dribbble.com/users/722246/screenshots/2989548/dribbble.gif"
                  alt=""
                />
              </div>
              <div className="login-page-container">
                <div className="login-intro">
                  <Typed
                    strings={[
                      'Take a quiz to create your personalized playlist',
                    ]}
                    typeSpeed={40}
                  />
                </div>

                <a
                  id="login-spotify"
                  className="btn btn--login"
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    '%20'
                  )}&response_type=token&show_dialog=true`}
                >
                  Login to Spotify
                </a>
              </div>
            </Fragment>
          ) : null}

          {this.state.token && (
            <Fragment>
              <Route exact path="/" component={TestQuiz} />
              <Route exact path="/recommendation" component={Recommendation} />
            </Fragment>
          )}
        </body>
      </Router>
    );
  }
}

export default App;
