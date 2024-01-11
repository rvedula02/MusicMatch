import * as playlistcrud from "../js/playlistCRUD.js"

let topTracks = [];
let songQueue = [];
let currTrack = null;
let user = "";
let audio = new Audio();
const likeButtonElem = document.getElementById('like-btn');
const dislikeButtonElem = document.getElementById('dislike-btn')

//fetches user's top tracks using spotify endpoint
async function fetchTopTracks(){
    try{
        console.log("top tracks")
        let response = 
            await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('accessToken') }
            });
        let jsonStr = await response.json();
        console.log("json", jsonStr.items)
        topTracks.push(...jsonStr.items);
    }
    catch(error){
        console.error(error);
    }
}

//gets the user's id
async function fetchUser(){
    await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .then(response => response.json())
            .then(data => {
                user = data.id; 
            });
    console.log("fetched")
}


//updates current song to random track from user's top 50 tracks
function fetchRandomTrack(){
    let rand = Math.floor(Math.random() * 50);
    currTrack = topTracks[rand];
}

//adds recommendations to song queue
async function addRecs(trackID){
    try {
        // console.log(trackID);
        const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackID}&limit=5`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('accessToken') }
        });
        const data = await response.json();
        console.log("in add recs")
        if(data.tracks && data.tracks.length > 0){
            songQueue.push(...data.tracks);
            console.log(songQueue);
        }
        else{
            console.log("else statement recursive call")
            fetchRandomTrack();
            addRecs(currTrack.id);
        }
    }
    catch(error){
        console.error(error);
    }
}

//function to go to the next song and update current track. Also plays audio snippet
async function next(){
    if(songQueue.length === 0){
        fetchRandomTrack();
        await addRecs(currTrack.id);
    }
    else{
        currTrack = songQueue.shift();
    }

    updateSong();
    console.log(currTrack);
    if(currTrack.preview_url){
        audio.pause();
        audio = new Audio(currTrack.preview_url);
        audio.play();
    }
    else{
        audio.pause();
    }
}

//update Song display statistics on the discovery page
function updateSong(){
    document.getElementById('song').querySelector('img').src = currTrack.album.images[0].url;
    document.getElementById('song').querySelector('h2').innerText = currTrack.name;
    document.getElementById('song').querySelector('h3').innerText = currTrack.artists[0].name;
    document.getElementById('song').querySelector('p').innerText = 'Duration: ' + Math.floor(currTrack.duration_ms / 60000) + ':' + ((currTrack.duration_ms % 60000) / 1000).toFixed(0);
}

//function to add recs and shift songs when like button is hit
async function like() {
    let current = currTrack;
    next();
    
    if(current){
        try{
            await addRecs(current.id);
            await playlistcrud.crudUpdatePlaylist({user,song:current.id,playlist:"Discover"})
        }
        catch(err){
            console.log(err)
        }
    }
    console.log("thats crazy")
}

//event listener for like button
likeButtonElem.addEventListener('click', function() {
    like();
});

//event listener for dislike button
dislikeButtonElem.addEventListener('click', function() {
    next()
});

//eventlistener for key like/dislike button
document.addEventListener("keyup",(key)=>{
    if (key.code === "ArrowLeft") next()
    else if (key.code === "ArrowRight") like()
});

// fetch the user's top tracks when the page loads
window.onload = async function() {
    await fetchUser()
    // fetchTopTracks().then(() => {
    //     next();
    // });
    await fetchTopTracks()
    next()
};