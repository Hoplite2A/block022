async function fName() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/');
        const fNamejson = await res.json();
        return fNamejson;
    }
    catch (error) {
        console.log(error);
    }
};

fName();

