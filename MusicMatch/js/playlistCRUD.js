import Pouchdb from 'pouchdb';

const db = new Pouchdb("playlist");


//data:{name}
async function createPlaylist(data){
    try{
        await db.get(data.name);
        console.log("name exists")
        //added functionality letting user know that the name already exists
    }
    catch{
        await db.put({_id:data.name,songs:[]});
    }
}

async function readPlaylist(name){
    try{
        let data = await db.get(name);
        return songs.songs;
    }
    catch(err){
        console.log(err);
    }
}


// async function updatePlaylist(name,song){
//     try{
//         const curData = await db.get(name)
//     }
// }

//async function deleteSong(playlist,songname){}

//async function deletePlaylist
