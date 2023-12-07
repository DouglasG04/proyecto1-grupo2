function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

const currentPage = window.location.href.split('/').pop();

    
const idSession = JSON.parse(localStorage.getItem('sessionToken'));
const idUser = JSON.parse(localStorage.getItem('session'));


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

let formInp = document.getElementById("form");
formInp.addEventListener("submit",(e)=>{
  let userNameInp = document.getElementById("username");
  let emailInp = document.getElementById("email");
  let phoneInp = document.getElementById("phone");
  let messageInp = document.getElementById("message");
  e.preventDefault();

  const userName = userNameInp.value;
  const email = emailInp.value;
  const phone = phoneInp.value;
  const message = messageInp.value;

  const formData = {
    name: userName,
    email: email,
    phone: phone,
    message: message,
  };
  fetch("http://localhost:1234/api/user/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), 
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        Swal.fire({
          title: "¡Comentario Enviado!",
          text: "Le agradecemos su comentario.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      console.error("Error al enviar el comentario:", error);
    });
})