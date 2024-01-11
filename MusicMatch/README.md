# Team 16 Project

You are to start your team project here. Read the documentation for
[Pr2: Creative Idea](https://umass-cs-326.github.io/docs/project/Idea/) and replace this paragraph with your team's
creative web application idea!

Also, replace NUM above with your team's number.

Application name: MusicMatch

Team Overview (name and github username):  
Aayush Patel: aaypatel  
Arnav Kolli: arnav-kolli  
Rahul Vedula: rvedula02  
Anvesh Sunkara: Anvesh8712

Innovative Idea:
Our idea is similar to existing dating apps. Current dating apps suggest users to each other based on a variety of features depending on the app. Tinder is mostly physical attributes while Bumble or Hinge use prompts that users can fill out. In our case we intend to design an app that one can use to discover both people AND music. 
We intend to analyze user's music preferences so we can match users with similar music tastes while also having a discover music functionality where we suggest new music that can be added to a playlist. We're sure that the idea and concept itself is not new, however, we have not encountered an app that uses music as the base for matches. This makes the concept slightly unique in that it is a dating AND music app (sorta!).

Data:
Excluding user data, our application will probably deal with the following data entries:
1. Songs: Audio files/Dictionaries --> Firstly, we will need to deal with audio files so we can quantitatively analyze user's music tastes and preferences. We intend to use APIs for this purpose.
2. User Matches: Graphs --> We intend to use graphs to keep track of user matches
3. Album Covers: Images --> Displaying album/song covers for each song
4. Messaging service: Text --> Create messaging platform between matches users
5. Playlists: Arrays --> Create "playlists" (arrays) of songs that a user likes from suggested music
6. Artist info: Dictionaries --> We intend to have artist details, so it allows people to discover more music  

At this point, this is what we can think of. However, we are sure that as we start work on this idea there will be more data concepts that arise. 

Functionality:
As was mentioned in the data above, we intend to have a fully functioning web app that has different types of functionalities.
1. Messaging Service: Users with similar music preferences are matched and can chat with each other. They will get notified when there is a match, and have the ability to see how the music preferences are similar to the person they matched with. 
2. Music Analysis: Users can swipe through our selection of initial music or upload their own playlists for us to analyze their music tastes based on quantitative song features such as tempo/danceability/energy/genre, etc.
3. Music Discovery: Users can discover new music through our recommendation algorithm. Each song that shows up for the user to swipe left or right on will be based off the previous decisions of the user with other songs from various genres. 
4. Playlists: Users can add new songs that they like to their own playlists. This will allow them to access their playlists to see which songs have potentially affected what the app recommends once they decide on more songs. 
5. Music app exports: We hope to add functionality that allows users to export their created playlists from MusicMatch to their libraries in Spotify or Apple Music.

License:

Copyright 2023 MusicMatch

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
