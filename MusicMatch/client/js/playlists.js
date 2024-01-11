import * as crud from "./playlistCRUD.js";

const create = document.getElementById("createPlaylist");
const playlistname = document.getElementById("playlistname");
const playlist = document.getElementById("playlist")
const accessToken = localStorage.getItem("accessToken");
const exportAll = document.getElementById("exportAll");
const exportTo = document.getElementById("exportTo");
const deleteSelected = document.getElementById("deleteSelected"); 

let user = "";
let userPlaylists = [];

await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            user = data.id; 
        });


function selectAll(){
        let checkboxSongs = document.querySelectorAll(".playlist-table input[type='checkbox']");
        for(let i = 0; i<checkboxSongs.length;i++){
            checkboxSongs[i].checked = !checkboxSongs[i].checked
        }
    }

async function getPlaylists(){
    let offset = 0
    let cnt = 0;
    while(true){
        await fetch(`https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                userPlaylists.push(...data.items.filter((item)=>item.owner.id==user)); 
                cnt = data.items.length;
            });
        offset+=50
        if(cnt<50){
            break
        }
    }
    let label = document.createElement("label");
    label.setAttribute("for","dropdown");
    label.textContent = "Export Selected to:"

    let select = document.createElement("select");
    select.setAttribute("id","dropdown");
    for (let i =0; i<userPlaylists.length;i++){
        let option = document.createElement("option");
        option.setAttribute("value",userPlaylists[i].id)
        option.text = userPlaylists[i].name;
        select.appendChild(option);
    }

    let button = document.createElement("button");
    button.setAttribute("id","exportSelected")
    button.textContent = "go";
    button.addEventListener("click",exportSelected);

    exportTo.appendChild(label);
    exportTo.appendChild(select);
    exportTo.appendChild(button);
    exportTo.className = "export-container";
}

async function populateSongs(playlist_name){
    let res = await crud.crudReadSongs({user,playlist:playlist_name});
    playlist.innerHTML = "";
    playlist.innerHTML = ""
    let html = `
    <h1> Liked Songs </h1>
  <table class = playlist-table>
    <thead>
      <tr>
        <th></th>
        <th>Song</th>
        <th>Artist</th>
        <th>Album</th>
        <th><button class="selectAll" id="selectAll"></button></th>
      </t
    </thead>
    <tbody>`
    
    for(let song of res.songs){
        let songData = await songidToSong(song.song_id);
        html += `
        <tr>
        <td><img src="${songData.art.url}"/></td>
        <td>${songData.name}</td>
        <td>${songData.artist.toString()}</td>
        <td>${songData.album}</td>
        <td><input type="checkbox" value="${song.song_id}" id="${song.song_id}"></td>
      </tr>
      `
    };
    html += "</tbody></table>";
    playlist.innerHTML = html;

    const selectAllbtn = document.getElementById("selectAll");
    selectAllbtn.addEventListener("click",selectAll);
}

async function main(){
    let playlists = await crud.crudReadPlaylists({user});
    playlists = playlists.playlists
    if(playlists.length == 0){
        await crud.crudCreatePlaylist({user,playlist:"Discover"});
    }
    await populateSongs("Discover");
    await getPlaylists();
    // console.log(userPlaylists);
}

async function songidToSong(song_id){
    let songDetails = {name:"",artist:"",album:"",art:""}
    await fetch(`https://api.spotify.com/v1/tracks/${song_id}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(response => response.json())
    .then(data => {
        songDetails.name = data.name
        let artists = []
        for(let i = 0; i <data.artists.length;i++){
            artists.push(data.artists[i].name)
        }
        songDetails.artist=artists
        songDetails.album =  data.album.name
        songDetails.art = data.album.images[2]
    });
    // console.log(songDetails)
    return songDetails
}



main()

async function exportSelected(){
    let checkboxSongs = document.querySelectorAll(".playlist-table input[type='checkbox']");
    let toExport = []
    for(let i = 0; i<checkboxSongs.length;i++){
        if(checkboxSongs[i].checked){
            toExport.push(checkboxSongs[i].value);
        }
    }
    let playlist_id = document.getElementById("dropdown");

    playlist_id = playlist_id.value
    toExport = toExport.map((i)=>"spotify:track:"+i)
    try{
    let response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'POST',
            headers: { 'Authorization' : 'Bearer ' + accessToken,
            "Content-type":"application/json"
            },
            body: JSON.stringify({"uris":toExport})
        });
        alert(`exported songs to playlist`)
    }
    catch(error){
        console.log(error);
    }
}

deleteSelected.addEventListener("click",async ()=>{
    let checkboxSongs = document.querySelectorAll(".playlist-table input[type='checkbox']");
    let toDelete = []
    for(let i = 0; i<checkboxSongs.length;i++){
        if(checkboxSongs[i].checked){
            toDelete.push({user,songID:checkboxSongs[i].value})
        }
    }
    console.log(toDelete)
    try {
        await crud.crudDeleteSong(toDelete);
        console.log("beforre reload!!!!")
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    //await populateSongs("Discover");
    //reload page
    
});


