import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecommendation } from './Reducer';
// import Recommendation from './Recommendation';
import hash from '../hash';

const QuizQuestions = [
  {
    id: 1,
    question: 'Are you feeling...',
    type: 'genre',
    valueOne: 'classical',
    valueTwo: 'rock',
    endOfQuiz: false,
    imageOne:
      'https://cdn.dribbble.com/users/1056629/screenshots/3220439/unicorn.gif',
    imageTwo:
      'https://media1.tenor.com/images/bb1ce6f41734e0e897d26dfaa0a01a29/tenor.gif?itemid=7552017',
  },
  {
    id: 2,
    question: 'Pick one',
    type: 'instrumentalness',
    valueOne: 0.7,
    valueTwo: 0.3,
    endOfQuiz: false,
    imageOne: 'https://media2.giphy.com/media/1wXbeoh28PW8v9ANDN/source.gif',
    imageTwo: 'https://media.giphy.com/media/bLEXpHXxV15Go/giphy.gif',
  },
];

class DisconnectedTestQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      valence: null,
      energy: null,
      dancebility: null,
      instrumentalness: null,
      popularity: null,
      genre: '',
      endOfQuiz: false,
      playlistReady: false,
      spotifyData: [],
      currentQuestion: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('is state updated?', this.props);
    //want to be able to call getRecommendation(token, this.state)

    this.props.getRecommendation(this.state, hash.access_token);

    this.setState({ playlistReady: true });
  }

  render() {
    let nextQuestion = QuizQuestions[this.currentQuestion.id];
    console.log('Next Question - were hitting testquiz', nextQuestion);
    return (
      <div>
        <h3 className="quiz-question">Are you feeling...</h3>
        <div className="quiz-container">
          <img
            src="https://cdn.dribbble.com/users/1056629/screenshots/3220439/unicorn.gif"
            alt=""
            onClick={() =>
              this.setState({
                genre: 'classical',
                endOfQuiz: true,
                currentQuestion: nextQuestion,
              })
            }
          />
          or
          <img
            src="https://media1.tenor.com/images/bb1ce6f41734e0e897d26dfaa0a01a29/tenor.gif?itemid=7552017"
            alt=""
            onClick={() => this.setState({ energy: 0.2 })}
          />
          ?
        </div>

        <form onSubmit={this.handleSubmit}>
          {this.state.endOfQuiz ? (
            <button type="submit">Generate Playlist!</button>
          ) : null}
        </form>

        {this.state.playlistReady && <Redirect to="./recommendation" />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRecommendation: (seed, token) =>
      dispatch(getRecommendation(seed, token)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedTestQuiz);
