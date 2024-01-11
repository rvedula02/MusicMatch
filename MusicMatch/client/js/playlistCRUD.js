//data:{user:username,playlist:playlistname}
export async function crudCreatePlaylist(data) {
    try{
    await fetch(`/createPlaylist`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("playlist: ", data)
    }
    catch(err){
        console.log(err);
    }
  }
  
  //data:{user:username}
  export async function crudReadPlaylists(data) {
    try {
      const response = await fetch(`/readPlaylists?user=${data.user}`, {
        method: 'GET'
      });
      let ret = await response.json();
      return ret
    } catch (err) {
      console.log(err);
    }
  }
  
  //data:{user,playlist}
  export async function crudReadSongs(data) {
    try {
      const response = await fetch(`/readSongs?user=${data.user}&playlist=${data.playlist}`, {
        method: 'GET',
        // body: JSON.stringify(data)

      });
      let ret = await response.json();
      return ret
    } catch (err) {
      console.log(err);
    }
  }

  //Adding songs to playlist
  //data:{user,song,playlist}
  export async function crudUpdatePlaylist(data) {
    try{
      // ?user=${data.user}&songID=${data.song}&playlist=${data.playlist}`
      console.log("updating", data)
      await fetch(`/addSong`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log("playlist1: ",data)
    } catch (err) {
      console.log(err);
    }
  }

  //remove songs from playlist
  //data:{user,songid}
  //changed to [{user, songid}]
  export async function crudDeleteSong(data) {
    try{
      console.log("playlistCrud", data)
      await fetch(`/deleteSong`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log("playlistCrud2", data)
    } catch (err) {
      console.log(err);
    }
  }