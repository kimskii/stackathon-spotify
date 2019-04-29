window.onSpotifyWebPlaybackSDKReady = () => {
  const token =
    'BQBV5DVr5wvKcwA1K7yFWouuKEVchWNIsrhI9sQjKH7X18emuYU_RSj_BJkTC27LATYfzOre8nvr1DtDCEh4ZhfjF9F0GDy9pXs4LNaU7f98BCz61TnDN-goxYJFQ5w_g4rfV4jm8DetGG8RACCGeL7-bYbjFnf3t6NjE3piJSWMZmx-5MRnq1lS2yae';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => {
      cb(token);
    },
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('playback_error', ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener('player_state_changed', state => {
    console.log(state);
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};
