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


let slideIndex = 0;
showSlides();

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

const businesses = [{
  photography: "../assets/img/image1.jpg",
  name: "El Mirador",
  location: "Montes de Oro",
  price: "65.000",
},
{
  photography: "../assets/img/image2.jpg",
  name: "Sky Tram",
  location: "Arenal",
  price: "15.000",
},
{
  photography: "../assets/img/image3.jpg",
  name: "Negra's Place",
  location: "Punta Uva",
  price: "6.000",
},
{
  photography: "../assets/img/image4.jpg",
  name: "Tropical Lodge",
  location: "Esterillos",
  price: "25.000",
},
{
  photography: "../assets/img/image5.jpg",
  name: "Surf School",
  location: "Santa Teresa",
  price: "7.000",
},
{
  photography: "../assets/img/image6.jpg",
  name: "Soda Guetto Girl",
  location: "Puerto Viejo",
  price: "8.000",
},
{
  photography: "../assets/img/image7.jpg",
  name: "Sky Walk",
  location: "Monteverde",
  price: "15.000",
},
{
  photography: "../assets/img/image8.jpg",
  name: "Donde Tere",
  location: "Fraijanes",
  price: "10.000",
},
{
  photography: "../assets/img/image9.jpg",
  name: "Tamarindo nightlife",
  location: "Tamarindo",
  price: "5.000",
},
{
  photography: "../assets/img/image10.jpg",
  name: "El Bosque",
  location: "Santa Elena",
  price: "45.000",
},
{
  photography: "../assets/img/image11.jpg",
  name: "Tico y Rico",
  location: "Playa del Coco",
  price: "15.000",
},
{
  photography: "../assets/img/image12.jpg",
  name: "Kerwá hostel",
  location: "Brasilito",
  price: "30.000",
}];

window.onload = function () {
  renderlist();
};

function renderlist() {
  const businessesContainer = document.getElementById("businessesList")
  businesses.forEach(function (business) {
    businessesContainer.innerHTML +=
      `<div class="card-business">
      <div class="business-photograpy">
      <img  src='${business.photography}'/>
      </div>
      <div class="card-business-info"> 
      <p class="card-business-title">${business.name}, ${business.location}</p>
      <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
      </div>
      
    </div>`;
  });
}


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
  fetch(`http://localhost:1234/api/user/logout/654d44d828e632989e4f2826`, {
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