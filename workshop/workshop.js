const newPartyForm = document.querySelector("#new-party-form");
const partyContainer = document.querySelector("#party-container");

const PARTIES_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/parties";
const GUESTS_API_URL =
  "http://fsa-async-await.herokuapp.com/api/workshop/guests";
const RSVPS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/rsvps";
const GIFTS_API_URL = "http://fsa-async-await.herokuapp.com/api/workshop/gifts";

// get all parties
const getAllParties = async () => {
  try {
    const res = await fetch(PARTIES_API_URL);
    //! ---- API Block Test
      if (res.ok) {
          console.log("getAllParties Function: SUCCESS");
        } else {
          console.log("getAllParties Function: NOT-SUCCESSFUL");
        }
    const getAllPartiesjson = await res.json();
    return getAllPartiesjson;
  }
  catch (error) {
    console.error(error);
  }
};

console.log(await getAllParties());

// get single party by id
const getPartyById = async (id) => {
  try {
    const res = await fetch(`${PARTIES_API_URL}/${id}`);
      //! ---- API Block Test
      if (res.ok) {
          console.log("getPartyById Function: SUCCESS");
        } else {
          console.log("getPartyById Function: NOT-SUCCESSFUL");
        }
    const getPartyByIdjson = await res.json();
    return getPartyByIdjson;
  }
  catch (error) {
    console.error(error);
  }
};

// delete party
const deleteParty = async (id) => {
  try {
    const res = await fetch(`${PARTIES_API_URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
      //! ---- API Block Test
      if (res.ok) {
          console.log("getPartyById Function: SUCCESS");
        } else {
          console.log("getPartyById Function: NOT-SUCCESSFUL");
        }
    const deletePartyjson = res.json();
    return deletePartyjson;
  }
  catch (error) {
    console.log(error);
  }
};

// render a single party by id
const renderSinglePartyById = async (id) => {
  try {
    // fetch party details from server
    const party = await getPartyById(id);

    // GET - /api/workshop/guests/party/:partyId - get guests by party id
    const guestsRes = await fetch(`${GUESTS_API_URL}/party/${id}`);
      //! ---- API Block Test
      if (guestsRes.ok) {
          console.log("guestsRes Function: SUCCESS");
        } else {
          console.log("guestsRes Function: NOT-SUCCESSFUL");
        }
    const guests = await guestsRes.json();

    // GET - /api/workshop/rsvps/party/:partyId - get RSVPs by partyId
    const rsvpsRes = await fetch(`${RSVPS_API_URL}/party/${id}`);
      //! ---- API Block Test
      if (rsvpsRes.ok) {
          console.log("rsvpsRes Function: SUCCESS");
        } else {
          console.log("rsvpsRes Function: NOT-SUCCESSFUL");
        }
    const rsvps = await rsvpsRes.json();

    // GET - get all gifts by party id - /api/workshop/parties/gifts/:partyId -BUGGY?
    // const giftsResponse = await fetch(`${PARTIES_API_URL}/party/gifts/${id}`);
    // const gifts = await giftsResponse.json();

    // create new HTML element to display party details
    const partyDetailsElement = document.createElement("div");
    partyDetailsElement.classList.add("party-details");
    partyDetailsElement.innerHTML = `
            <h2>${party.title}</h2>
            <p>${party.event}</p>
            <p>${party.city}</p>
            <p>${party.state}</p>
            <p>${party.country}</p>
            <h3>Guests:</h3>
            <ul>
            ${guests
              .map(
                (guest, index) => `
                  <li>
                    <div>${guest.name}</div>
                    <div>${rsvps[index].status}</div>
                  </li>
                `
              )
              .join("")}
          </ul>
          


            <button class="close-button">Close</button>
    `;
    partyContainer.appendChild(partyDetailsElement);

    // add event listener to close button
    const closeButton = partyDetailsElement.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      partyDetailsElement.remove();
    });
  }
  catch (error) {
    console.error(error);
  }
};

// render all parties
const renderParties = async (parties) => {
  try {
    partyContainer.innerHTML = "";
    parties.forEach((party) => {
      const partyElement = document.createElement("div");
      partyElement.classList.add("party");
      partyElement.innerHTML = `
                <h2>${party.name}</h2>
                <p>${party.description}</p>
                <p>${party.date}</p>
                <p>${party.time}</p>
                <p>${party.location}</p>
                <button class="details-button" data-id="${party.id}">See Details</button>
                <button class="delete-button" data-id="${party.id}">Delete</button>
            `;
      partyContainer.appendChild(partyElement);

      // see details
      const detailsButton = partyElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        //TODO ------------------------------------------------------------------------------------------//
        renderSinglePartyById(party.id);
      });

      // delete party
      const deleteButton = partyElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async (event) => {
        //TODO ------------------------------------------------------------------------------------------//
        deleteParty(party.id);
      });
    });
  }
  catch (error) {
    console.error(error);
  }
};

// init function
const init = async () => {
  //*Rendering All Parties To Web Page:
  const partiesList = await getAllParties();
  renderParties(partiesList);
};

init();
