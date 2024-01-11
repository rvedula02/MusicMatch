import * as crud from "./crud.js";

const REDIRECT_URI = 'http://localhost:3001/client/groups.html';

const form = document.getElementById("form");

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const postData = {
    'artist_name': document.getElementById('artist-name').value,
    'event_date': document.getElementById('event-date').value,
    'event_name': document.getElementById('event-name').value,
    'description': document.getElementById('post-content').value,
    'date_posted': document.getElementById('date-posted').value,
  };
  try {
    await crud.crudCreatePost(postData)
    // Redirect to the post page
    window.location.href = REDIRECT_URI;
  } catch (error) {
    console.error(error);
  }
});

