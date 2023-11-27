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


let slideIndex = 0;


function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 10000); // Change image every 10 seconds
}



window.onload = function () {
  showSlides();
};


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show2");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn2')) {
    var dropdowns = document.getElementsByClassName("dropdown-content2");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show2')) {
        openDropdown.classList.remove('show2');
      }
    }
  }
}

const dropdownUserNav = document.getElementById('myDropdown');

if (dropdownUserNav) {
  dropdownUserNav.addEventListener('click', function (event) {
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
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('session');
            window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-login/login.html';
          }
        });
      }
    });
}


fetch('http://localhost:1234/api/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => response.json())
  .then((data) => {
    const users = data;
    const businessesContainer = document.getElementById("businessesList")


    users.forEach((user) => {
      user.business.forEach((business) => {

        if (business.statusBusiness === true) {
          const userIdForBusiness = user._id;
          switch (business.province) {
            case 'SJ':
              business.province = 'San José'
              break;

            case 'A':
              business.province = 'Alajuela'
              break;

            case 'C':
              business.province = 'Cartago'
              break;

            case 'H':
              business.province = 'Heredia'
              break;

            case 'G':
              business.province = 'Guanacaste'
              break;

            case 'P':
              business.province = 'Puntarenas'
              break;

            case 'L':
              business.province = 'Limón'
              break;

            default:
              break;

          }

          businessesContainer.innerHTML +=
            `<div class="card-business" data-method-id="${business._id}" data-user-id="${userIdForBusiness}">
            <div class="business-photograpy">
              <img src='${business.photos[0]}'/>
            </div>
            <div class="card-business-info"> 
              <p class="card-business-title">${business.name}, ${business.province}</p>
              <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
            </div>
      
          </div>`

         
        }

      })
    })

  })


const businessesContainer = document.getElementById("businessesList");

businessesContainer.addEventListener('click', function (event) {
  const clickedBusiness = event.target.closest('.card-business');

  if (clickedBusiness) {
    const businessId = clickedBusiness.getAttribute('data-method-id');
    const userIdForBusiness = clickedBusiness.getAttribute('data-user-id');



    window.location.href = `http://127.0.0.1:5500/src/public/pages/render-business/businesspage.html?id=${userIdForBusiness}&business=${businessId}`;

  }
});