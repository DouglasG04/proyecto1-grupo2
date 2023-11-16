function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

const currentPage = window.location.href.split('/').pop();

    
const idSession = localStorage.getItem('sessionToken');
const idUser = localStorage.getItem('session');


fetch(`http://localhost:1234/api/user/6555603df4526d0724350314`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then((response) => response.json())
.then((data) => {
    const userType = data.user.typeofuser;
    handleNavBarByRole(userType, currentPage);
});



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
  fetch(`http://localhost:1234/api/user/logout/654d3a8bbae8b12b0617f5d0`, {
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


const btnReserve = document.getElementById('btnReserve');

btnReserve.addEventListener('click', function () {
  window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-payment/payment.html'

  
})