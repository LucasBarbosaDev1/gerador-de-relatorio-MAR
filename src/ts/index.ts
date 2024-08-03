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

