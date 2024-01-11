import PouchDB from 'pouchdb';
import pg from 'pg';
import 'dotenv/config'

const { Pool } = pg
const db = new PouchDB('forum');
const plist = new PouchDB('Playlist');

class Database{ 
    constructor(){
        const connectionString = process.env.DATABASE_URL;
        const poolConfig = {
        connectionString: connectionString,
        }
        this.pool = new Pool(poolConfig);
    }

    // Function to create a new forum post
    async createPost(data) {
        try {
            console.log([data.artist_name, data.event_date, data.event_name, data.description, data.date_posted])
            const queryText = 'INSERT INTO forums(artist_name, event_date, event_name, description, date_posted) VALUES($1, $2, $3, $4, $5);';
            await this.pool.query(queryText,[data.artist_name, data.event_date, data.event_name, data.description, data.date_posted])
        } catch (error) {
            console.error(error);
        }
    }
    
    // Function to retrieve all forum posts
    async getAllPosts() {
        const queryText = 'SELECT * FROM forums'
        let data = (await this.pool.query(queryText))
        return data.rows
    }
    
    // Function to retrieve a specific forum post by ID
    async getPostById(id) {
        const queryText = 'SELECT * FROM forums WHERE forum_id = $1'
        let data = (await this.pool.query(queryText, [id]))
        return data.rows;
    }
    
    // Function to update an existing forum post
    async updatePost(id, data) {
        return db.get(id)
        .then(doc => {
            return db.put(Object.assign(doc, data));
        });
    }
    
    // Function to delete a forum post
    async deletePost(id) {
        return db.get(id)
        .then(doc => {
            return db.remove(doc);
        });
    }

    // PLAYLISTS tablename: playlists(song_id user_id playlist_name)

    async createPlaylist(user,playlist_name){
        // try{
        //     await plist.get(data.name);
        //     // console.log("name exists");
        //     //added functionality letting user know that the name already exists
        // }
        // catch{
        //     await plist.put({_id:data.name,songs:[]});
        // }
        try{
            let query = "insert into playlists(song_id,user_id,playlist_name) values($1,$2,$3);";
            await this.pool.query(query,["null",user,playlist_name]);
        }
        catch(err){
            console.log(err);
        }
    }

    async readAllPlaylists(user){
        // try{
        //     const docs = await plist.allDocs();
        //     return docs.rows.map(row => row.id);
        // }
        // catch(err){
        //     console.log(err);
        // }
        try{
            let query = "Select distinct playlist_name from playlists where user_id=$1";
            let data = await this.pool.query(query,[user]);
            return data.rows;
        }
        catch(err){
            console.log(err);
        }
    }
    async readPlaylist(user,playlist_name){
        // try{
        //     let data = await plist.get(name);
        //     return data.songs;
        // }
        // catch(err){
        //     console.log(err);
        // }
        try{
            let query = "select song_id from playlists where user_id = $1 and playlist_name = $2 and song_id!=$3;";
            let data =await this.pool.query(query,[user,playlist_name,"null"]);
            return data.rows;
        }
        catch(err){
            console.log(err);
        }
    }

    //songID will be used in the API call and name,artist album etc will be available at the call
    //add songs to playlist
    async updatePlaylist(user,songID,playlist_name){
        // try{
        //     const curData = await plist.get(name);
        //     curData.songs.push(songID);
        //     // console.log(curData.songs)
        //     plist.put({_id:name,_rev:curData._rev,songs:curData.songs});
        // }
        // catch(err){
        //     console.log(err);
        // }
        try{
            let query = "insert into playlists(song_id,user_id,playlist_name) values($1,$2,$3);";
            await this.pool.query(query,[songID,user,playlist_name]);
        }
        catch(err){
            console.log(err);
        }
    }

    //deletes a song from the playlist
    //(may have to change functionality to have index of song instead of ID)
   async deleteSong(data){
        try{
            // let songIDs = [songID1, songID2, songID3]; // Array of song IDs
            console.log("data", data)
            let songIDs = data.map(obj => obj.songID);
            console.log("songIDs: ", songIDs)
            let user = data[0].user;
            console.log("user", user)
            let query = `DELETE FROM playlists 
                        WHERE song_id IN (${songIDs.map((_, index) => `$${index + 1}`).join(',')})
                            AND user_id = $${songIDs.length + 1}
                            AND playlist_name = $${songIDs.length + 2};`;

            let values = [...songIDs, user, "Discover"];

            await this.pool.query(query, values);
        }
        catch(err){
            console.log(err);
        }
    }

    async deletePlaylist(user,playlist_name){
        // console.log(playlist);
        // try{
        //     await plist.remove(playlist)
        // }
        // catch(err){
        //     console.log(err)
        // }
        try{
            let query = "delete from playlists where user_id=$1 and playlist_id=$2";
            await this.pool.query(query,[user,playlist_name]);
        }
        catch(err){
            console.log(err);
        }
    }
}

const database = new Database()

export {database}