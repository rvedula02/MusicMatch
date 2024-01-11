import * as crud from "./crud.js";

//access the groups.html page
//get data from crud for forums
//upload to forums div
//create new divs for each forum
//[{},{},{},{},{}]

let forums = document.getElementById("forums");
// await crud.crudCreatePost({
//   artistName: "Anvesh Sunkara",
//   eventDate: "2023-07-30",
//   eventName: "Coachella",
//   Description: "Anvesh is performing",
//   DatePosted: "2023-04-23",
// });

async function main() {
  let posts = await crud.crudReadAllPosts();
  console.log("posts", posts)
  let coolData = posts.data;
  for (let i = 0; i < coolData.length; i++) {
    if (coolData[i].hasOwnProperty("artist_name")) {
      let post = document.createElement("div");
      post.className = "forum";
      post.id = coolData[i]["id"];
      post.innerHTML =
        "<div>" +
        coolData[i]["artist_name"] +
        "</div>" +
        "<div>" +
        "Event Date: " + coolData[i]["event_date"] +
        "</div>" +
        "<div>" +
        coolData[i]["event_name"] +
        "</div>" +
        "<div>" +
        coolData[i]["description"] +
        "</div>" +
        "<div>" +
        coolData[i]["date_posted"] +
        "</div>";
      forums.appendChild(post);
    } else {
      console.log(coolData[i]);
    }
  }
}

main();
