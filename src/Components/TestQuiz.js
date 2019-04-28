import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecommendation } from './Reducer';
// import Recommendation from './Recommendation';
import hash from '../hash';
import QuizQuestions from './QuizQuestions';

class DisconnectedTestQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      valence: null,
      energy: null,
      dancebility: null,
      instrumentalness: null,
      artist: null,
      genre: '',
      endOfQuiz: false,
      playlistReady: false,
      spotifyData: [],
      currentQuestion: 0,
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
    // console.log('Next Question - were hitting testquiz', nextQuestion);
    const currentQuestion = QuizQuestions[this.state.currentQuestion];

    const type = currentQuestion.type;

    const newStateOne = currentQuestion.endOfQuiz
      ? { endOfQuiz: currentQuestion.endOfQuiz }
      : {
          endOfQuiz: currentQuestion.endOfQuiz,
          currentQuestion: this.state.currentQuestion + 1,
        };

    const newStateTwo = Object.assign({}, newStateOne);

    newStateOne[type] = currentQuestion.valueOne;
    newStateTwo[type] = currentQuestion.valueTwo;

    console.log('checking state', this.state);

    return (
      <div>
        <h3 className="quiz-question">{currentQuestion.question}</h3>
        <div className="quiz-container">
          <img
            src={currentQuestion.imageOne}
            alt=""
            onClick={() => this.setState(newStateOne)}
          />
          <img
            src={currentQuestion.imageTwo}
            alt=""
            onClick={() => this.setState(newStateTwo)}
          />
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
