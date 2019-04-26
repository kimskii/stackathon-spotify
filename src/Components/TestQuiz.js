import React from 'react';
import { Redirect } from 'react-router-dom';

const QuizQuestions = [
  { question: 'Are you feeling...', imageOne: '', imageTwo: '' },
  { question: 'Are you feeling...', imageOne: '', imageTwo: '' },
  { question: 'Are you feeling...', imageOne: '', imageTwo: '' },
  { question: 'Are you feeling...', imageOne: '', imageTwo: '' },
  { question: 'Are you feeling...', imageOne: '', imageTwo: '' },
];

class TestQuiz extends React.Component {
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('is state updated?', this.props);
    //want to be able to call getRecommendation(token, this.state)
    this.props.getRecommendation(this.props.token, this.state);
    this.setState({ playlistReady: true });
  }

  render() {
    console.log('were hitting testquiz');
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

        {this.state.playlistReady && <Redirect to="/recommendation" />}
      </div>
    );
  }
}

export default TestQuiz;