import React from 'react';
import { connect } from 'react-redux';
import { getRecommendation } from './Reducer';
import hash from '../hash';
import QuizQuestions from './QuizQuestions';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
      percentage: 17,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // event.preventDefault();
    console.log('is state updated?', this.props);
    this.props.getRecommendation(this.state, hash.access_token);
    this.props.history.push('/recommendation');
  }

  render() {
    // console.log('Next Question - were hitting testquiz', nextQuestion);
    const currentQuestion = QuizQuestions[this.state.currentQuestion];

    const type = currentQuestion.type;

    const newStateOne = currentQuestion.endOfQuiz
      ? { endOfQuiz: currentQuestion.endOfQuiz, percentage: 100 }
      : {
          endOfQuiz: currentQuestion.endOfQuiz,
          currentQuestion: this.state.currentQuestion + 1,
          percentage: this.state.percentage + 17,
        };

    const newStateTwo = Object.assign({}, newStateOne);

    newStateOne[type] = currentQuestion.valueOne;
    newStateTwo[type] = currentQuestion.valueTwo;

    console.log('checking state', this.state);

    return (
      <div>
        <div className="quiz-question-container">
          {currentQuestion.question}
          {!this.state.endOfQuiz && (
            <CircularProgressbar
              className="progress-bar"
              percentage={this.state.percentage}
              text={`Q ${currentQuestion.id} of 6`}
              background
              backgroundPadding={0}
              styles={{
                background: {
                  fill: 'transparent',
                },
                text: {
                  fill: '#1ecd97',
                  fontSize: '16px',
                },
                path: {
                  stroke: '#1ecd97',
                },
                trail: { stroke: 'transparent' },
              }}
            />
          )}
          {this.state.endOfQuiz ? (
            <div className="submit-playlist">
              <img
                id="generate-playlist"
                type="submit"
                src="https://thumbs.gfycat.com/HeftyAncientCaimanlizard-max-1mb.gif"
                border="0"
                value="generate-playlist"
                alt="submit"
              />
              <p onClick={() => this.handleSubmit()}>Generate Playlist</p>
            </div>
          ) : null}
        </div>
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
