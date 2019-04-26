import React, { Component } from 'react';
import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import hash from './hash';
// import Player from './Player';
import TestQuiz from './Components/TestQuiz';
import Recommendation from './Components/Recommendation';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

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

  //TODO: my take on the recommendation API
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
          recommendation: data.tracks,
        });
      },
    });
  }

  render() {
    console.log('checking state', this.state);
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token ? (
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  '%20'
                )}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
              </a>
            </div>
          ) : null}

          {this.state.token && (
            <div className="quiz-playlist-container">
              <TestQuiz
                getRecommendation={this.getRecommendation}
                token={this.state.token}
              />
              <Route exact path="/recommendation" component={Recommendation} />

              {/* <TestQuiz
                getRecommendation={this.getRecommendation}
                token={this.state.token}
              />
              <Recommendation recommendation={this.state.recommendation} /> */}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
