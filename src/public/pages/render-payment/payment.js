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


const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const businessId = urlParams.get('business');
let amount;
let baseBusinessValue;
let businessNameForReservation;

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

      const businessName = document.querySelector('.info-title');
      businessName.innerText = business.name;
      businessNameForReservation = business.name;

      const businessLocation = document.querySelector('.info-contents');

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

      businessLocation.innerText = `${business.province}, ${business.state}`;

      const businessType = document.querySelector('.info-contents-type');
      businessType.innerText = `${business.category}`;

      const priceBusiness = document.querySelector('.price-business');
      priceBusiness.innerText = `₡${business.price} c/día`;
      baseBusinessValue = business.price;
      amount = baseBusinessValue;

      const imgBusiness = document.querySelector('.form-img');
      imgBusiness.src = business.photos[0];


      // Solicitar reserva section
      const name = document.getElementById('nombre');
      name.value = user.name;


      const lastname = document.getElementById('apellido');
      lastname.value = user.lastname;

      const email = document.getElementById('email');
      email.value = user.email;

      const phone = document.getElementById('telefono');
      phone.value = user.phonenumber;

    }
  })



// Handle payment details 
const numberOfDays = document.querySelector('.date-business');
const totalAmountElement = document.querySelector('.totalamount-business');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
const yyyy = today.getFullYear();
const currentDate = `${yyyy}-${mm}-${dd}`;

checkin.setAttribute('min', currentDate);
checkout.setAttribute('min', currentDate);

checkin.addEventListener('change', updateNumberOfDays);
checkout.addEventListener('change', updateNumberOfDays);

function updateNumberOfDays() {
  const checkinDate = new Date(checkin.value);
  const checkoutDate = new Date(checkout.value);

  if (checkoutDate > checkinDate) {
    const differenceInTime = checkoutDate.getTime() - checkinDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    numberOfDays.innerText = `${differenceInDays} días`;

    // Actualizar amount usando la diferencia de días
    amount = baseBusinessValue * differenceInDays;
    totalAmountElement.innerText = `₡${amount}`;
  } else {
    numberOfDays.innerText = '0 días';
    amount = baseBusinessValue;
    totalAmountElement.innerText = `₡${amount}`;
  }
}




const discountAmount = document.querySelector('.discountamount-business');




const form = document.getElementById('form');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Reservation
  const checkin = document.getElementById('checkin').value;
  getCheckinDate = checkin;
  const checkout = document.getElementById('checkout').value;
  getCheckoutDate = checkout;

  // Payment
  const headline = document.getElementById('titular').value;
  const bank = document.getElementById('bank').value;
  const cardnumber = document.getElementById('numeroTarjeta').value;

  const expirationmonth = document.getElementById('month').value;
  const experationyear = document.getElementById('year').value;

  const cvv = document.getElementById('cvvcvc').value;


  const dataForAddReservation = {
    businessName: businessNameForReservation,
    checkin,
    checkout,
    amount
  }

  const dataForAddPayment = {
    bank,
    headline: headline.toUpperCase(),
    cardnumber,
    expirationmonth,
    experationyear,
    cvv,
  }

  fetch(`http://localhost:1234/api/user/reservation/6555603df4526d0724350314`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForAddReservation)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        fetch(`http://localhost:1234/api/user/paymentmethod/6555603df4526d0724350314`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForAddPayment)
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 200) {

              Swal.fire({
                title: '¡Pago y reserva con exito!',
                text: 'Seras redirigido a tu cuenta',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-profile/profile.html';
                }
              });
            } else {
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
                title: 'Ocurrio un error a la hora de reservar!'
              })
            }
          })

      }
    })




})






