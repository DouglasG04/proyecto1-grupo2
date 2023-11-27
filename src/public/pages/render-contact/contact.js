function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

const currentPage = window.location.href.split('/').pop();

    
const idSessionWithQuotes = localStorage.getItem('sessionToken');
const idSession = idSessionWithQuotes.replaceAll('"', '');


const idUserWithQuotes = localStorage.getItem('session');
const idUser = idUserWithQuotes.replaceAll('"', '');


fetch(`http://localhost:1234/api/user/${idUser}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then((response) => response.json())
.then((data) => {
    const userType = data.user.typeofuser;
    handleNavBarByRole(userType, currentPage);
}).catch((error) => {
  handleNavBarByRole(null, currentPage);
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
  fetch(`http://localhost:1234/api/user/logout/${idSession}`, {
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