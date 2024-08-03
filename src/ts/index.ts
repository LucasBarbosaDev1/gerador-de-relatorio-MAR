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

// dados dos formularios
const formCloro = document.querySelector('.formCloro') as HTMLFormElement;
const formQuimicos = document.querySelector('.formQuimicos') as HTMLFormElement;

if (localStorage.getItem('dataBase') === null) {
  localStorage.setItem('dataBase', JSON.stringify(
{   
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
});

formQuimicos.addEventListener('submit', (ev) => {
  ev.preventDefault();
  
  dataBaseObj.dateQuimicos = analysisDate();
  dataBaseObj.lazox = Number(formQuimicos.lazox.value);
  dataBaseObj.salmolaz = Number(formQuimicos.salmolaz.value);
  dataBaseObj.lazAcid = Number(formQuimicos.lazAcid.value);
  
  localStorage.setItem('dataBase', JSON.stringify(dataBaseObj))
  console.log(typeof dataBaseObj)
});
