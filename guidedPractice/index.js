//? 2. Create a `script.js` file with create an asynchronous `init` function that will
//? contain your most important code.Call the `init` function at the bottom of your file.

//! DEFINING GLOBAL SCOPED VARIABLES:
const baseURL = "https://fsa-async-await.herokuapp.com";
const allSongs = "/api/guided-practice/songs";
const createANewSong = "/api/guided-practice/songs";
const divSongContainer = document.getElementById("song-container");
const divNewSongContainer = document.getElementById("new-song-container");
const songToAdd = {
    title: "Let Freedom Reign",
    release_date: "1776-07-04T00:00:00.000Z",
    genre_id: 1776,
    artist_id: 1,
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
    
    await addNewSong(songToAdd);
}

//? 3. Write a function called `fetchAllSongs` that will fetch all songs from the server
//? and return them as JSON.
async function fetchAllSongs() {
  try {
    const res = await fetch(`${baseURL}${allSongs}`);
    const jsonAllSongs = res.json();
    return jsonAllSongs;
  }
  catch (error) {
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
  }
  catch (error) {
    console.log(error);
  }
};

//? 8. Write a new function called `renderNewSongForm` that will render a form to the
//? DOM.The form should have inputs for the following fields: title, artist, genre, and
//? release date.The form should also have a submit button.
function renderNewSongForm() {
    const divNewSongContainerHTML = divNewSongContainer; 
    divNewSongContainerHTML.innerHTML = `
    <form>
        <label for="newSongTitle">Title:</label>
            <input id="newSongTitle" name="newSongTitle" type="text">
        <label for="newSongArtist">Artist:</label>
            <input id="newSongArtist" name="newSongArtist" type="text">
        <label for="newSongGenre">Genre:</label>
            <input id="newSongGenre" name="newSongGenre" type="number">
        <label for="newSongReleaseDate">Release Date: </label>
            <input id="newSongReleaseDate" name="newSongReleaseDate" type="datetime">
        <button type="submit">Submit</button>
    </form>
    `
};

renderNewSongForm();

init();
