function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

const idSession = localStorage.getItem('sessionToken');
const idUser = localStorage.getItem('session');


const nav = document.querySelector('.nav-container-options');
const dropdownUserNav = document.getElementById('myDropdown');


fetch(`http://localhost:1234/api/user/654ff430b4bb2b240b264b22`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.user.typeofuser === 'C') {
      nav.innerHTML = ` 
                <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>`

      dropdownUserNav.innerHTML += `
      <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>

      `
    } else if (data.user.typeofuser === 'P') {
      nav.innerHTML = ` 
        <li><a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Mis negocios</a></li>
        <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`

      dropdownUserNav.innerHTML = `
      <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>
      `
    } else if (data.user.typeofuser === 'A') {
      nav.innerHTML = ` 
        <li><a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Reportes</a></li>`

      dropdownUserNav.innerHTML = `
      <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>
      <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Reportes</a>
      `
    }
  })


  
const formContact = document.getElementById('form');

formContact.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const data = {
    username,
    email,
    phone,
    message
  };


  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Correo enviado!'
  })
})


const logoutContainer = document.getElementById('myDropdown');

if (logoutContainer) {
  logoutContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('logout')) {
      handleLogoutClick(event);
    }
  });
}

function handleLogoutClick(event) {
  event.preventDefault();
  fetch(`http://localhost:1234/api/user/logout/654d3a80bae8b12b0617f5cb`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        Swal.fire({
          title: '¡Cerrando Sesión!',
          text: 'Seras redirigido al inicio de sesión',
          icon: 'success',
          confirmButtonText: 'Aceptar',
      }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('session');
            window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-login/login.html';
          }
        });
      }
    });
}