const socket = io.connect();
let chat = document.querySelector('#chat');
let txtMessage = document.querySelector('#message');
let btnSend = document.querySelector('#submit');
let formChat = document.querySelector('#messageForm');
let messages = [];
formChat.addEventListener('submit', (e) => {
  e.preventDefault();
  var msg = txtMessage.value;
  socket.emit('send message', msg);
  txtMessage.value = '';
});

socket.on('new message', (data) => {
  chat.innerHTML += `
      <li class="mt-2 list-group-item d-flex justify-content-between align-items-center">
        ${data.msg}
        <span class=" badge badge-success" id="userName">${data.user}</span>
      </li>`;
});

// LOGIN
let btnEnter = document.querySelector('#btnEnter');
let home = document.querySelector('#home');
let interface = document.querySelector('.interface');
let user_interface = document.querySelector('.user-interface');
let txtUserName = document.querySelector('#txtUserName');
let user_names = document.querySelector('#user-names');
// user-names
home.addEventListener('submit', (e) => {
  e.preventDefault();
  interface.style.display = 'flex';
  user_interface.style.display = 'none';
  socket.emit('new user', txtUserName.value);
});

socket.on('get users', (users) => {

  $(() => {
    $('#alert').fadeOut(2000);
  });
  user_names.innerHTML = '';
  for (let i = 0; i < users.length; i++) {
    user_names.innerHTML += `
      <li class="mt-2 list-group-item d-flex justify-content-between align-items-center">
        ${users[i]}
        <span class="badge"><span class="badge"><small class="text-success fas fa-circle"></small></span></span>
      </li>`;
  }
});
socket.on('left', (data) => {
  $(() => {
    $('#alert2').show();
    $('#alert2').fadeOut(2000);
  });
});

socket.on('join', (data) => {
  $(() => {
    $('#alert3').show();
    $('#user-name-joined').text(data);
    $('#alert3').fadeOut(3000);
  });
});