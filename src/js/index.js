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
// permanencia dos dados no localStorage
const formCloro = document.querySelector('.formCloro');
const formQuimicos = document.querySelector('.formQuimicos');
if (localStorage.getItem('dataBase') === null) {
    localStorage.setItem('dataBase', JSON.stringify({
        dateCloro: "",
        dateQuimicos: "",
        ref: 0.00,
        ban: 0.00,
        barrPena: 0.00,
        barrVis: 0.00,
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
    render();
});
formQuimicos.addEventListener('submit', (ev) => {
    ev.preventDefault();
    dataBaseObj.dateQuimicos = analysisDate();
    dataBaseObj.lazox = Number(formQuimicos.lazox.value);
    dataBaseObj.salmolaz = Number(formQuimicos.salmolaz.value);
    dataBaseObj.lazAcid = Number(formQuimicos.lazAcid.value);
    localStorage.setItem('dataBase', JSON.stringify(dataBaseObj));
    render();
});
// renderização dos dados
const dateCloro = document.querySelector('.c-main__day--dateCloro');
const refeitorio = document.querySelector('.c-main__infos--ref');
const banheiro = document.querySelector('.c-main__infos--ban');
const barrPena = document.querySelector('.c-main__infos--barrPena');
const barrVis = document.querySelector('.c-main__infos--barrVis');
const aguaBruta = document.querySelector('.c-main__infos--aguaBruta');
const obs = document.querySelector('.c-main__infos--obs');
const dateQuimicos = document.querySelector('.c-main__day--dateQuimicos');
const lazox = document.querySelector('.c-main__infos--lazox');
const salmolaz = document.querySelector('.c-main__infos--salmolaz');
const lazAcid = document.querySelector('.c-main__infos--lazAcid');
function render() {
    dateCloro.textContent = dataBaseObj.dateCloro;
    refeitorio.textContent = dataBaseObj.ref.toFixed(2);
    banheiro.textContent = dataBaseObj.ban.toFixed(2);
    barrPena.textContent = dataBaseObj.barrPena.toFixed(2);
    barrVis.textContent = dataBaseObj.barrVis.toFixed(2);
    aguaBruta.textContent = dataBaseObj.aguaBruta;
    obs.textContent = dataBaseObj.obs;
    dateQuimicos.textContent = dataBaseObj.dateQuimicos;
    lazox.textContent = dataBaseObj.lazox.toString();
    salmolaz.textContent = dataBaseObj.salmolaz.toString();
    lazAcid.textContent = dataBaseObj.lazAcid.toString();
}
render();
