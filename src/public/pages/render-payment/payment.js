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
                    <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
                    <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`
  
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
    fetch(`http://localhost:1234/api/user/logout/654d45438cbe1ea5c50cef5a`, {
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

form.addEventListener('submit', (event) => {
    event.preventDefault();
   
    const name = document.getElementById('nombre').value;
    const lastname = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('pais').value;
    const phone = document.getElementById('telefono').value;
    

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
        title: 'Pago exitoso!'
    })
})