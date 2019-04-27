import * as $ from 'jquery';

//initial state
const initialState = {
  recommendation: [],
};

//action getRecommendation
const GET_RECOMMENDATION = 'GET_RECOMMENDATION';

//thunk

export const getRecommendation = (seed, token) => {
  return async dispatch => {
    await $.ajax({
      url: `https://api.spotify.com/v1/recommendations?market=ES&seed_genres=${
        seed.genre
      }&limit=10`,
      type: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      success: data => {
        console.log('REDUX are there recommendations i?', data);
        return dispatch({
          type: 'GET_RECOMMENDATION',
          spotifyData: data.tracks,
        });
      },
    });
  };
};

//reducer
const recommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECOMMENDATION:
      return {
        recommendation: action.spotifyData,
      };
    default:
      return state;
  }
};

export default recommendationReducer;
