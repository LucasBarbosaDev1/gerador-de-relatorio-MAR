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
// dados dos formularios
const formCloro = document.querySelector('.formCloro');
const formQuimicos = document.querySelector('.formQuimicos');
if (localStorage.getItem('dataBase') === null) {
    localStorage.setItem('dataBase', JSON.stringify({
        dateCloro: "",
        dateQuimicos: "",
        ref: 0,
        ban: 0,
        barrPena: 0,
        barrVis: 0,
        aguaBruta: "",
        obs: "",
        lazox: 0,
        salmolaz: 0,
        lazAcid: 0
    }));
}
;
;
let dataBaseString = localStorage.getItem('dataBase');
let dataBaseObj = JSON.parse(dataBaseString);
const analysisDate = () => {
    const date = new Date();
    const day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : `${date.getDate}`;
    const month = date.getMonth().toString().length == 1 ? `0${date.getMonth()}` : `${date.getMonth}`;
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
};
formCloro.addEventListener('submit', (ev) => {
    ev.preventDefault();
    dataBaseObj.dateCloro = analysisDate();
    dataBaseObj.ref = Number(formCloro.ref.value);
    dataBaseObj.ban = Number(formCloro.ban.value);
    dataBaseObj.barrPena = Number(formCloro.barrPena.value);
    dataBaseObj.barrVis = Number(formCloro.barrVis.value);
    dataBaseObj.aguaBruta = formCloro.aguaBruta.checked ? "Ligada" : "Desligada";
    dataBaseObj.obs = formCloro.obs.value;
    localStorage.setItem('dataBase', JSON.stringify(dataBaseObj));
});
formQuimicos.addEventListener('submit', (ev) => {
    ev.preventDefault();
    dataBaseObj.dateQuimicos = analysisDate();
    dataBaseObj.lazox = Number(formQuimicos.lazox.value);
    dataBaseObj.salmolaz = Number(formQuimicos.salmolaz.value);
    dataBaseObj.lazAcid = Number(formQuimicos.lazAcid.value);
    localStorage.setItem('dataBase', JSON.stringify(dataBaseObj));
    console.log(typeof dataBaseObj);
});
