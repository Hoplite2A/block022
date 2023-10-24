// Step 1: Create empty html String
// Step 2: Loop over the todos Data
// Step 3: Each step:
//             Add a <p></p> with the todos in the Event
// Step 4: Create a reference in JS to the container.
// Step 5: Insert HTML string into container


async function getJsonInfo() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todos = await res.json();
        return todos;
    }
    catch (err) {
        console.log(err);
    }
};

const parEl = document.getElementById("post-container");

function createEl(todos) {
    for (let i = 0; i < todos.length; i++){
        const pTag = document.createElement("p")
        pTag.innerText = `Title: ${todos[i].title}`;
        parEl.appendChild(pTag);
    } 
};

const todos = await getJsonInfo();
createEl(todos);