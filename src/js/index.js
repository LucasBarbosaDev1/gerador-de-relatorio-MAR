"use strict";
// lista de usuarios
const listUsers = document.querySelector('#user');
;
let users = [
    { name: 'Lucas', number: 85987692718 },
    { name: 'Xavier', number: 85991458965 }
];
users.forEach(item => {
    listUsers.innerHTML += `<option>${item.name}</option>`;
});
