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


const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const businessId = urlParams.get('business');



// Load business by id
fetch(`http://localhost:1234/api/user/business/${userId}/${businessId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => response.json())
  .then(data => {
    if (data.status === 200) {
      const business = data.business;
      const user = data.user;

      const imgBusiness = document.querySelector('.images-container');
      imgBusiness.innerHTML = `
      <div class="img-1">
        <img class="img-1" src="${business.photos[0]}" alt="imagen negocio">
      </div>
      <div class="img-2">
        <img class="img-2" src="${business.photos[1]}" alt="imagen negocio">
      </div>
      <div class="img-3">
        <img class="img-3" src="${business.photos[2]}" alt="imagen negocio">
      </div>
      <div class="img-4">
        <img class="img-4" src="${business.photos[3]}" alt="imagen negocio">
      </div>
      <div class="img-5">
        <img class="img-5" src="${business.photos[4]}" alt="imagen negocio">
      </div>
      `


      const category = document.querySelector('.title-category');
      category.innerText = `${business.category}`

      const name = document.querySelector('.business-name');
      name.innerText = `${business.name}`

      const location = document.querySelector('.title-location');


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

      location.innerText = `${business.state}, ${business.province}`


      const description = document.querySelector('.description-business');
      description.innerText = `${business.generaldescription}`

      const fulladdress = document.querySelector('.full-address');
      fulladdress.innerText = `${business.direccion}, ${business.direccion2}, ${business.direccion3}`


      const destination = document.querySelector('[placeholder="Choose destination"]')
      destination.value = business.mapdirection;


      const price = document.querySelector('.price-business');
      price.innerText = `₡${business.price}`


      const phone = document.querySelector('.phone-business');
      phone.innerText = `${business.phonenumber}`

      const ubication = document.querySelector('.ubication2');
      ubication.innerText = `Costa Rica, ${business.province}`

      const email = document.querySelector('.email-business');
      email.innerText = `${user.email}`

      const divRating = document.querySelector('.comment-total');
      const rating = business.ratings;

      rating.forEach(element => {
        switch (element.state) {
          case 'SJ':
            element.state = 'San José'
            break;

          case 'A':
            element.state = 'Alajuela'
            break;

          case 'C':
            element.state = 'Cartago'
            break;

          case 'H':
            element.state = 'Heredia'
            break;

          case 'G':
            element.state = 'Guanacaste'
            break;

          case 'P':
            element.state = 'Puntarenas'
            break;

          case 'L':
            element.state = 'Limón'
            break;

          default:
            break;
        }


        divRating.innerHTML += `
        <div class="comment-review">
          <div class="photo-review">
              <img class="photo-review" src="${element.photo}" alt="${element.name}">
          </div>
          <div class="person-comment"">
              <h1>${element.name} ${element.lastname}</h1>
              <h3>${element.country}, ${element.state}</h3>
          </div>
        </div>
        <div class=" comment">
                <p>${element.comment}
                </p>
        </div>`
      })

    }
  })



const btnSendRating = document.getElementById('btnSendRating');

btnSendRating.addEventListener('click', () => {
  const comment = document.getElementById('ratingText').value;

  // Load data user by id
  fetch(`http://localhost:1234/api/user/${idUser}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then(data => {
      const user = data.user;

      const name = user.name;
      const lastname = user.lastname;
      const photo = user.personalphoto;
      const country = "Costa Rica";
      const state = user.state;


      const FormData = {
        comment,
        photo,
        name,
        lastname,
        country,
        state,
      }

      // Send rating
      fetch(`http://localhost:1234/api/user/business/rating/${userId}/${businessId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      }).then((response) => response.json())
        .then(data => {
          if (data.status === 200) {
            Swal.fire({
              title: '¡Calificación enviada!',
              text: 'Gracias por calificar',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {

              }
            });
          }
        })

    })


})






const btnReserve = document.getElementById('btnReserve');

btnReserve.addEventListener('click', function () {
  window.location.href = `http://127.0.0.1:5500/src/public/pages/render-payment/payment.html?id=${userId}&business=${businessId}`

})