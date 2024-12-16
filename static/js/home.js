"use strict";


function get_tokens() {
    const url = 'http://127.0.0.1:8000/login';
    const body = {
        username: "test",
        password: "test"
    };

    let container = document.getElementById("response");

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => {return response.json()})
    .then((data) => {
        container.innerText = JSON.stringify(data, null, 2);
        console.log(data);
    });
}