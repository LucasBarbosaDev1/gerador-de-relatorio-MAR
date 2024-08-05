"use strict";
// registro dos dados no localStorage
const formCloro = document.querySelector('.formCloro');
const formQuimicos = document.querySelector('.formQuimicos');
const modal = document.querySelector('.c-main__modal');
const divConfirm = document.querySelector('.c-main__confirm--alert');
const btnSave = document.querySelector('#save');
const btnCancel = document.querySelector('#cancel');
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
    modal.style.display = "flex";
    btnSave.addEventListener('click', () => {
        dataBaseObj.dateCloro = analysisDate();
        dataBaseObj.ref = Number(formCloro.ref.value);
        dataBaseObj.ban = Number(formCloro.ban.value);
        dataBaseObj.barrPena = Number(formCloro.barrPena.value);
        dataBaseObj.barrVis = Number(formCloro.barrVis.value);
        dataBaseObj.aguaBruta = formCloro.aguaBruta.checked ? "Ligada" : "Desligada";
        dataBaseObj.obs = formCloro.obs.value;
        localStorage.setItem('dataBase', JSON.stringify(dataBaseObj));
        render();
        modal.style.display = "none";
    });
});
formQuimicos.addEventListener('submit', (ev) => {
    ev.preventDefault();
    modal.style.display = "flex";
    btnSave.addEventListener('click', () => {
        dataBaseObj.dateQuimicos = analysisDate();
        dataBaseObj.lazox = Number(formQuimicos.lazox.value);
        dataBaseObj.salmolaz = Number(formQuimicos.salmolaz.value);
        dataBaseObj.lazAcid = Number(formQuimicos.lazAcid.value);
        localStorage.setItem('dataBase', JSON.stringify(dataBaseObj));
        render();
        modal.style.display = "none";
    });
});
btnCancel && modal.addEventListener('click', () => {
    modal.style.display = "none";
});
divConfirm.addEventListener('click', (ev) => {
    ev.stopPropagation();
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
;
render();
// gerar relatório
const relaCloro = document.querySelector('.c-main__result--relaCloro');
let unconformities = "";
relaCloro.addEventListener('click', () => {
    if (dataBaseObj.ref < 0.2) {
        unconformities += "%0ARefeitório abaixo do padrão";
    }
    else if (dataBaseObj.ref > 2) {
        unconformities += "%0ARefeitório acima do padrão";
    }
    ;
    if (dataBaseObj.ban < 0.2) {
        unconformities += "%0ABanheiro abaixo do padrão";
    }
    else if (dataBaseObj.ban > 2) {
        unconformities += "%0ABanheiro acima do padrão";
    }
    ;
    if (dataBaseObj.barrPena < 0.2) {
        unconformities += "%0ABarreira Pena abaixo do padrão";
    }
    else if (dataBaseObj.barrPena > 2) {
        unconformities += "%0ABarreira Pena acima do padrão";
    }
    ;
    if (dataBaseObj.barrVis < 0.2) {
        unconformities += "%0ABarreira Víscera abaixo do padrão";
    }
    else if (dataBaseObj.barrVis > 2) {
        unconformities += "%0ABarreira Víscera acima do padrão";
    }
    ;
    window.open(`https://api.whatsapp.com/send?&text=*Clora%C3%A7%C3%A3o%20da%20%C3%81gua*%0ARefeit%C3%B3rio:%20${dataBaseObj.ref}%0ABanheiro:%20${dataBaseObj.ban}%0ABarreira%20Pena:%20${dataBaseObj.barrPena}%0ABarreira%20V%C3%ADscera:%20${dataBaseObj.barrVis}%0A%C3%81gua%20Bruta:%20${dataBaseObj.aguaBruta}%0A%0AOBS.:${dataBaseObj.obs === "" ? "" : "%0A"}${dataBaseObj.obs}${unconformities}`);
    unconformities = "";
});
const relaQuimicos = document.querySelector('.c-main__result--relaQuimicos');
relaQuimicos.addEventListener('click', () => {
    window.open(`https://api.whatsapp.com/send?&text=*N%C3%ADvel%20dos%20Qu%C3%ADmicos*%0ALazox%20MC:%20${dataBaseObj.lazox}%20L%0ASalmolaz:%20${dataBaseObj.salmolaz}%20L%0ALaz%20Acid:%20${dataBaseObj.lazAcid}%20L`);
});
