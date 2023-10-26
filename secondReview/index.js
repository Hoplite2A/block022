const baseURL = "https://jsonplaceholder.typicode.com";
const posts = "/posts";
const div1InnerHTML = document.getElementById("dvi1");


//? Step 1: 
async function fName() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const fNamejson = await res.json();
        return fNamejson;
    }
    catch (error) {
        console.log(error);
    }
};
const getPosts = await fName();
console.log(getPosts);

//? Step 2: 
function enterHTML(post) {
    post.forEach((posted) => {
        const head = document.createElement("h2");
        head.innerText = post.title;
        const body = document.createElement("p");
        body.innerText = post.body;
        
    });
};

enterHTML(getPosts);