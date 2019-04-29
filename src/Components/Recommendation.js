import React from 'react';
import { connect } from 'react-redux';

class DisconnectedRecommendation extends React.Component {
  render() {
    const recommendation = this.props.recommendation || [];

    console.log(this.props);
    return (
      <div className="playlist">
        <tbody>
          {recommendation.map(track => (
            <tr key={track.name}>
              <td>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlC-oa19nzfLCO1lEW4igRyzAVIAn_JCkyWiDddRKnC_tnbYrzeA" />
              </td>
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
