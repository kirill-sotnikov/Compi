const { ipcRenderer } = require('electron');

require('application.css');

window.addEventListener('load', (_, data) => {
  // document.querySelector('#sendbutton').addEventListener('click', () => {
  //   ipcRenderer.send('action', { meassage: 'sended' });
  // });

  let linkTo = document.querySelector('#linkTo');

  document.querySelector('#linkTo').addEventListener('change', (event) => {
    if (event.target.value) {
      location.href = event.target.value;
    } else {
      console.log(event.target.value);
    }
  });
});

// ipcRenderer.on('main-chanel', (event, data) => {

// });
