import React, { Component, Fragment } from 'react';
import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import hash from './hash';
// import Player from './Player';
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
      // item: {
      //   album: {
      //     images: [{ url: '' }],
      //   },
      //   name: '',
      //   artists: [{ name: '' }],
      //   duration_ms: 0,
      // },
      // is_playing: 'Paused',
      // progress_ms: 0,
    };
    this.getRecommendation = this.getRecommendation.bind(this);
    // this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      // this.getRecommendation(_token);
      // this.getCurrentlyPlaying(_token);
    }
  }

  // getCurrentlyPlaying(token) {
  //   Make a call using the token
  //   $.ajax({
  //     url: 'https://api.spotify.com/v1/me/player',
  //     type: 'GET',
  //     beforeSend: xhr => {
  //       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  //     },
  //     success: data => {
  //       console.log('data', data);
  //       this.setState({
  //         item: data.item,
  //         is_playing: data.is_playing,
  //         progress_ms: data.progress_ms,
  //       });
  //     },
  //   });
  // }

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
        {/* <div className="App"> */}
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
          {/* </div> */}
        </body>
      </Router>
    );
  }
}

export default App;
