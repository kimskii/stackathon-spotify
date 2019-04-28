import React from 'react';
import { connect } from 'react-redux';

class DisconnectedRecommendation extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/');
  }

  render() {
    const recommendation = this.props.recommendation || [];

    console.log(this.props);
    return (
      <div>
        <tbody>
          <tr>
            <td>SONG</td>
            <td>ARTIST</td>
            <td>ALBUM</td>
          </tr>

          {recommendation.map(track => (
            <tr key={track.name}>
              <td>
                <a href={track.external_urls.spotify}>{track.name}</a>
              </td>
              <td>{track.artists[0].name}</td>
              <td>{track.album.name}</td>
            </tr>
          ))}
        </tbody>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <button type="submit">Play Again</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recommendation: state.recommendation,
  };
};

export default connect(
  mapStateToProps,
  null
)(DisconnectedRecommendation);
