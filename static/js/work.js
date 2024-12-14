"use strict";

//console.log("Hello");
//http://192.168.1.122:8080/api/v1/auth

function get_tokens() {
    const url = 'http://127.0.0.1:8000/login';

    const formData = new FormData();
    formData.append('login', 'milto_aa');
    formData.append('password', '\\\$2a\\\$12$9AGfxXS7GZh9Dd0IYOq63OUnwlDo8AKYRSkkr730nkO9axlEn0Hfa');

    console.log(...formData);


    let container = document.getElementById("response");


    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        body: formData
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        container.innerText = JSON.stringify(data);
    })
    .catch((err) => {
        console.log('Fetch error: ', err);
        container.innerText = 'Ошибка: ' + err.message;
    });
}