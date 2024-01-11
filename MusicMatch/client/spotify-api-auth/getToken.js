var accessToken = "";
window.onload = async function() {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: '005d6e07f1404e53a388cdd5933ba469',
          client_secret: 'a7c5b6f6dfdd44d0b5583d84df4efb98',
          redirect_uri: 'http://localhost:3001/client/home.html',
          grant_type: 'authorization_code',
          code,
          scope: 'user-top-read'
        })
      })
      .then(response => response.json())
      .then(data => {
        // console.log('Authorization code:', code);
        accessToken = data.access_token
        console.log(accessToken);
        console.log('Access token:', data.access_token);   
        document.getElementById("signin").hidden = true
        window.localStorage.setItem("accessToken",accessToken)     
      });
    } else {
      try{
        let check;
        await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json())
        .then(data => {
          check = data.id
            console.log(data.id); 
        });

        if(localStorage.getItem("accessToken") && check){
          document.getElementById("signin").hidden = true
          console.log("have token")
        }
      } catch {
       document.getElementById("signin").hidden = false 
       console.log("dont have")
      }
      
    }
  };


  //TEST CODE TO SEE IF THE ACCESS TOKEN CAN BE USED TO FETCH ENDPOINTS
// let buttonElem = document.getElementById('ex')
// buttonElem.addEventListener('click', async () => {
//     console.log("in event listener");
//     console.log(accessToken);
//     await fetch('https://api.spotify.com/v1/me/top/tracks', {
//         method: 'GET',
//         headers: { 'Authorization' : 'Bearer ' + accessToken
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data); 
//     });
// })
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
document.getElementById("signin").addEventListener('click', async () => {
  window.location.href = authUrl;
})

document.getElementById("crew").addEventListener('click', () => {
  window.location.href = "groups.html"
})

document.getElementById("discover").addEventListener('click', () => {
  window.location.href = "discover.html"
})

document.getElementById("playlist").addEventListener('click', () => {
  window.location.href = "playlists.html"
})




