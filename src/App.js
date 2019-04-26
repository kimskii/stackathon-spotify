import React, { Component } from 'react';
import * as $ from 'jquery';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import hash from './hash';
// import Quiz from './Components/Quiz';
import Player from './Player';
import Recommendation from './Components/Recommendation';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      recommendation: [],
      item: {
        album: {
          images: [{ url: '' }],
        },
        name: '',
        artists: [{ name: '' }],
        duration_ms: 0,
      },
      is_playing: 'Paused',
      progress_ms: 0,
    };
    this.getRecommendation = this.getRecommendation.bind(this);
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getRecommendation(_token);
      this.getCurrentlyPlaying(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: data => {
        console.log('data', data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      },
    });
  }

  //TODO: my take on the recommendation API
  getRecommendation(token) {
    $.ajax({
      url:
        'https://api.spotify.com/v1/recommendations?market=ES&seed_genres=country&limit=10',
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
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : null}
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <div>
              {/* <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.progress_ms}
              /> */}
              {/* <Quiz /> */}
              <Recommendation recommendation={this.state.recommendation} />
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
