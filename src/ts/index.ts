// lista de usuarios
const listUsers = document.querySelector('#user') as HTMLSelectElement;

interface Users {
  name: string;
  number: number;
};

let users: Users[] = [
  {name: 'Lucas', number: 85987692718},
  {name: 'Xavier', number: 85991458965}
];

users.forEach(item => {
  listUsers.innerHTML += `<option>${item.name}</option>`;
});

// permanencia dos dados no localStorage
const formCloro = document.querySelector('.formCloro') as HTMLFormElement;
const formQuimicos = document.querySelector('.formQuimicos') as HTMLFormElement;

if (localStorage.getItem('dataBase') === null) {
  localStorage.setItem('dataBase', JSON.stringify(
{   
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
}  
  ));
};

interface DataBase {
  dateCloro: string;
  dateQuimicos: string;
  ref: number;
  ban: number;
  barrPena: number;
  barrVis: number;
  aguaBruta: string;
  obs: string;
  lazox: number
  salmolaz: number;
  lazAcid: number;
};

let dataBaseString: any = localStorage.getItem('dataBase');
let dataBaseObj: DataBase = JSON.parse(dataBaseString);

const analysisDate = ():string => {
  const date = new Date();

  const day: string = date.getDate().toString().length == 1 ? `0${date.getDate()}` : `${date.getDate}`;
  const month: string = date.getMonth().toString().length == 1 ? `0${date.getMonth()}` : `${date.getMonth}`;
  const year: string = date.getFullYear().toString();

  return `${day}/${month}/${year}`
}

formCloro.addEventListener('submit', (ev) => {
  ev.preventDefault();

  dataBaseObj.dateCloro = analysisDate();
  dataBaseObj.ref = Number(formCloro.ref.value);
  dataBaseObj.ban = Number(formCloro.ban.value);
  dataBaseObj.barrPena = Number(formCloro.barrPena.value);
  dataBaseObj.barrVis = Number(formCloro.barrVis.value);
  dataBaseObj.aguaBruta = formCloro.aguaBruta.checked ? "Ligada" : "Desligada";
  dataBaseObj.obs = formCloro.obs.value;

  localStorage.setItem('dataBase', JSON.stringify(dataBaseObj))
  render();
});

formQuimicos.addEventListener('submit', (ev) => {
  ev.preventDefault();
  
  dataBaseObj.dateQuimicos = analysisDate();
  dataBaseObj.lazox = Number(formQuimicos.lazox.value);
  dataBaseObj.salmolaz = Number(formQuimicos.salmolaz.value);
  dataBaseObj.lazAcid = Number(formQuimicos.lazAcid.value);
  
  localStorage.setItem('dataBase', JSON.stringify(dataBaseObj))
  render();  
});

// renderização dos dados
const dateCloro = document.querySelector('.c-main__day--dateCloro') as HTMLSpanElement;
const refeitorio = document.querySelector('.c-main__infos--ref') as HTMLSpanElement;
const banheiro = document.querySelector('.c-main__infos--ban') as HTMLSpanElement;
const barrPena = document.querySelector('.c-main__infos--barrPena') as HTMLSpanElement;
const barrVis = document.querySelector('.c-main__infos--barrVis') as HTMLSpanElement;
const aguaBruta = document.querySelector('.c-main__infos--aguaBruta') as HTMLSpanElement;
const obs = document.querySelector('.c-main__infos--obs') as HTMLSpanElement;

const dateQuimicos = document.querySelector('.c-main__day--dateQuimicos') as HTMLSpanElement;
const lazox = document.querySelector('.c-main__infos--lazox') as HTMLSpanElement;
const salmolaz = document.querySelector('.c-main__infos--salmolaz') as HTMLSpanElement;
const lazAcid = document.querySelector('.c-main__infos--lazAcid') as HTMLSpanElement;

function render(): void {
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