import React from 'react';
import { connect } from 'react-redux';

class DisconnectedRecommendation extends React.Component {
  render() {
    const recommendation = this.props.recommendation || [];

    console.log(this.props);
    return (
      <div>
        <tbody>
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

        <a
          id="login-spotify"
          className="btn btn--login"
          href="http://localhost:3000/#/"
        >
          Play Again
        </a>
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
