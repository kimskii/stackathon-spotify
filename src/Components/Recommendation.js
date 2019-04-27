import React from 'react';
import { connect } from 'react-redux';

class DisconnectedRecommendation extends React.Component {
  render() {
    const recommendation = this.props.recommendation || [];
    // console.log('checking if recommendation data got here', recommendation);
    // if (!recommendation[0]) {
    //   return 'this is loaindg!!';
    // }
    return (
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
