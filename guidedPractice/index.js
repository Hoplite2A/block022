//? 2. Create a `script.js` file with create an asynchronous `init` function that will
//? contain your most important code.Call the `init` function at the bottom of your file.

//! DEFINING GLOBAL SCOPED VARIABLES:
const baseURL = "https://fsa-async-await.herokuapp.com";
const allSongs = "/api/guided-practice/songs";
const createANewSong = "/api/guided-practice/songs";
const divSongContainer = document.getElementById("song-container");
const songToAdd = {
  artist_id: 1,
  genre_id: 1776,
  release_date: "1776-07-04T00:00:00.000Z",
  title: "Let Freedom Reign",
};

//? Step 2 Cont'd
async function init() {
  //? 4. Call the `fetchAllSongs` function inside your `init` function and console.log
  //? the result.You should see an array of all songs in your browser console.
  const songData = await fetchAllSongs();
  console.log(songData);

  //? 6. Call the `renderSongs` function inside your `init` function and pass in the array
  //? of songs you got from the server.
  renderAllSongs(songData);
}

//? 3. Write a function called `fetchAllSongs` that will fetch all songs from the server
//? and return them as JSON.
async function fetchAllSongs() {
  try {
    const res = await fetch(`${baseURL}${allSongs}`);
    const jsonAllSongs = res.json();
    return jsonAllSongs;
  } catch (error) {
    console.log(error);
  }
}

//? 5. Write a function called `renderAllSongs` that will take in an array of songs and
//? render them to the DOM.
async function renderAllSongs(songData) {
  let divSongContainerString = "";
  songData.forEach(
    (songData) => (divSongContainerString += `<p>${songData.title}</p>`)
  );
  divSongContainer.innerHTML = divSongContainerString;
}

//? 7. Write a function called `addNewSong` that will take in a song object and create a
//? new song on the server.This function should return the newly created song.
async function addNewSong(newSongData) {
  try {
    const res = fetch(`${baseURL}${createANewSong}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSongData),
    });
    const jsonNewSong = await res.json();
    return jsonNewSong;
  } catch (error) {
    console.log(error);
  }
}
await addNewSong(songToAdd);

init();
