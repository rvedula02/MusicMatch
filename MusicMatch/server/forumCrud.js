import express, { request, response } from 'express';
import logger from 'morgan';
import 'dotenv/config'
import { database } from './database.js';

const app = express();
const port = 3001;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));

app.get('/', async (request, response) => {
  response.redirect("http://localhost:3001/client/home.html")
})
app.post('/create', async (request, response) => {
  try {
    const options = request.body;
    console.log(options)
    await database.createPost(options);
    response.status(200).json({message: "Post created successfully."});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error in create."});
  }
});

app.get('/readAll', async (request, response) => {
  try {
    let res = await database.getAllPosts();
    response.status(200).json({message: "Post returned successfully.", data: res});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error in create."});
  }
});


app.put('/update', async (request, response) => {
  const options = request.body;
  database.updatePost(options.id, options);
});

app.delete('/delete', async (request, response) => {
  const options = request.body
  database.deleteCounter(options.id)
})

app.post("/createPlaylist",async(request,response)=>{
  try{
    const options = request.body;
    await database.createPlaylist(options.user,options.playlist);
  }
  catch(err){
    console.log(err);
  }
})

app.get('/readPlaylists',async (request,response)=>{
  try {
    const options = request.query
    let res = await database.readAllPlaylists(options.user);
    response.status(200).json({message: "list returned successfully.", playlists: res});
  } catch (error) {
    console.error(error);
    response.status(400).json({error: "Error reading"});
  }
})

app.get('/readSongs',async (request,response)=>{
  try{
    const options = request.query;
    let res = await database.readPlaylist(options.user,options.playlist);
    response.json({name:options.name,songs:res});
  }
  catch(error){
    response.status(400).json({error:"Errpr reading"});
  }
})

app.post('/addSong',async (request,response)=>{
  try{
    const options = request.body;
    await database.updatePlaylist(options.user,options.song,options.playlist);
    response.status(200).json({message: "added song successfully."});
    // response.json("Successful addition")
  }
  catch(err){
    console.log(err);
    response.status(400).json({error: "Error in songAdd"});
  }
})

app.post('/deleteSong',async(request,response)=>{
  try{
    const options = request.body;
    console.log("forumCrud: ",options)
    await database.deleteSong(options);
    response.status(200).json({message: "Post created successfully."});
  }
  catch(err){
    console.log(err);
    response.status(400).json({error: "Error in create."});
  }
});

app.delete('/deletePlaylist',async(request,response)=>{
  try{
    const options = request.query;
    database.deletePlaylist(options.name);
  }
  catch(err){
    console.log(err);
  }
});

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

