import React from 'react';
import { connect } from 'react-redux';
import { getRecommendation } from './Reducer';
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
      spotifyData: [],
      currentQuestion: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('is state updated?', this.props);
    this.props.getRecommendation(this.state, hash.access_token);
    this.props.history.push('/recommendation');
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
        <div className="quiz-question-container">
          {currentQuestion.question}
        </div>
        <div className="quiz-container">
          <img
            src={currentQuestion.imageOne}
            alt=""
            onClick={() => this.setState(newStateOne)}
          />
          {/* <p>or</p> */}
          <img
            src={currentQuestion.imageTwo}
            alt=""
            onClick={() => this.setState(newStateTwo)}
          />

          <form onSubmit={this.handleSubmit}>
            {this.state.endOfQuiz ? (
              <button type="submit">Generate Playlist!</button>
            ) : null}
          </form>
        </div>
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
