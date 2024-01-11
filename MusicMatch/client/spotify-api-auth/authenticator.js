const CLIENT_ID = '005d6e07f1404e53a388cdd5933ba469';
const REDIRECT_URI = 'http://localhost:3001/client/home.html';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'user-top-read', 'playlist-modify-public', 'playlist-modify-private'];

const STATE = Math.random().toString(36).substring(2, 15);

const authParams = new URLSearchParams({
  client_id: CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  scope: SCOPES.join(' '),
  state: STATE
});

const authUrl = `${AUTH_URL}?${authParams.toString()}`;

// Listen for the "Authorize with Spotify" button click event
document.querySelector('#authorize').addEventListener('click', async () => {
  window.location.href = authUrl;
  // await fetch('/login', {
  //       method: 'GET',
  // })
});
