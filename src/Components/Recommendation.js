import React from 'react';

const Recommendation = props => {
  const recommendation = props.recommendation;

  return (
    <div>
      <tr>
        <td>SONG</td>
        <td>ARTIST</td>
        <td>ALBUM</td>
      </tr>
      {recommendation.map(track => (
        <tr>
          <td>
            <a href={track.external_urls.spotify}>{track.name}</a>
          </td>
          <td>{track.artists[0].name}</td>
          <td>{track.album.name}</td>
        </tr>
      ))}
    </div>
  );
};

export default Recommendation;
