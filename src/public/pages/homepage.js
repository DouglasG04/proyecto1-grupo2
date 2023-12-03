const currentPage = window.location.href.split('/').pop();

const idSessionWithQuotes = localStorage.getItem('sessionToken');
const idSession = idSessionWithQuotes.replaceAll('"', '');


const idUserWithQuotes = localStorage.getItem('session');
const idUser = idUserWithQuotes.replaceAll('"', '');


let businessdata=[];
let filterSelected="";
let minpriceFilter="";
let maxpriceFilter=""


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
  var dropdowns = document.getElementsByClassName("dropdown-content2");
 
  var dropdowns = document.getElementsByClassName("dropdown-content2");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (!openDropdown.classList.contains('show2')) {
      document.getElementById("myDropdown2").classList.toggle("show2");
    }
  }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn2') && !event.target.matches('.dropdown-item2')) {
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
          
          businessdata.push(business);
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


function filter(){
    let inputValue = document.getElementsByClassName("search-bar-input")[0].value
    switch (filterSelected) {
      case 'Price':
        const filterPrice = businessdata.filter(filter => filter.price >= minpriceFilter && filter.price <= maxpriceFilter)
        if(filterPrice != null){
          businessesContainer.innerHTML="";
          filterPrice.forEach(business => {
            businessesContainer.innerHTML +=
          `<div class="card-business" data-method-id="${business._id}">
          <div class="business-photograpy">
            <img src='${business.photos[0]}'/>
          </div>
          <div class="card-business-info"> 
            <p class="card-business-title">${business.name}, ${business.province}</p>
            <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
          </div>
        
        </div>`
          });
        }
        break;

      case 'Province':
        const filterProvince = businessdata.filter(filter => filter.province.toLowerCase().includes(inputValue.toLowerCase()))
        if(filterProvince != null){
          businessesContainer.innerHTML="";
          filterProvince.forEach(business => {
            businessesContainer.innerHTML +=
          `<div class="card-business" data-method-id="${business._id}">
          <div class="business-photograpy">
            <img src='${business.photos[0]}'/>
          </div>
          <div class="card-business-info"> 
            <p class="card-business-title">${business.name}, ${business.province}</p>
            <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
          </div>
        
        </div>`
          });
        }
        break;

      case 'Category':
        const filterCat = businessdata.filter(filter => filter.category.toLowerCase().includes(inputValue.toLowerCase()))
        businessesContainer.innerHTML="";
        filterCat.forEach(business => {
          businessesContainer.innerHTML +=
        `<div class="card-business" data-method-id="${business._id}">
        <div class="business-photograpy">
          <img src='${business.photos[0]}'/>
        </div>
        <div class="card-business-info"> 
          <p class="card-business-title">${business.name}, ${business.province}</p>
          <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
        </div>
      
      </div>`
        });
        break;

      default:
        
      const filterAll = businessdata.filter(filter => filter.name.toLowerCase().includes(inputValue.toLowerCase()))
        businessesContainer.innerHTML="";
        filterAll.forEach(business => {
          businessesContainer.innerHTML +=
        `<div class="card-business" data-method-id="${business._id}">
        <div class="business-photograpy">
          <img src='${business.photos[0]}'/>
        </div>
        <div class="card-business-info"> 
          <p class="card-business-title">${business.name}, ${business.province}</p>
          <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
        </div>
      
      </div>`
        });
      
        break;

    }
}

var itemFilter = document.getElementById("myDropdown2");

for(i=0;i<=itemFilter.childElementCount-1;i++){
  itemFilter.children[i].addEventListener("click",function(event){
    handleItemFilter(event)
   
  });
  }
  var categoryFilter = document.getElementById("categories-container");

for(i=0;i<=categoryFilter.childElementCount-1;i++){
  categoryFilter.children[i].addEventListener("click",function(event){
    handleCategoryFilter(event)
  });
  }

  function handleItemFilter(event){
    event.preventDefault();
    var itemFilter = document.getElementsByClassName("dropdown-item2");
    for (var i = 0; i < itemFilter.length; i++) {
      let card = document.getElementsByClassName('card');
      if(event.target.id==='Price' && !event.target.classList.contains('dropdown-item2-active')){
        card[0].style.display = 'block';
  
      }
      else{
        card[0].style.display = 'none';
      }

      if(itemFilter[i].id=== event.target.id){
        if(itemFilter[i].classList.contains('dropdown-item2-active')){
          itemFilter[i].classList.remove('dropdown-item2-active')
          filterSelected = "";
        }
        else{
          
          itemFilter[i].classList.add('dropdown-item2-active')
        filterSelected = event.target.id;
        }
        
      }
      else if(itemFilter[i].classList.contains('dropdown-item2-active')){
        itemFilter[i].classList.remove('dropdown-item2-active')
      }
  }


  }


  function handleCategoryFilter(event){
    event.preventDefault();
    document.getElementsByClassName("search-bar-input")[0].value=""
    var itemFilter = document.getElementsByClassName("categories-container-item");
    for (var i = 0; i < itemFilter.length; i++) {
      itemFilter[i].classList.remove('categories-container-item-active')
      if(itemFilter[i].id=== event.target.id){
        itemFilter[i].classList.add('categories-container-item-active')
      }
  }
  const filterCategory = businessdata.filter(filter => filter.category === event.target.id)
if(filterCategory != null){
  businessesContainer.innerHTML="";
  filterCategory.forEach(business => {
    businessesContainer.innerHTML +=
  `<div class="card-business" data-method-id="${business._id}">
  <div class="business-photograpy">
    <img src='${business.photos[0]}'/>
  </div>
  <div class="card-business-info"> 
    <p class="card-business-title">${business.name}, ${business.province}</p>
    <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
  </div>

</div>`
  });
}
}

let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

const rangeFill = document.querySelector(".range-fill");

// Function to validate range and update the fill color on slider
function validateRange() {
  let minPrice = parseInt(inputElements[1].value);
  let maxPrice = parseInt(inputElements[2].value);

  if (minPrice > maxPrice) {
    let tempValue = maxPrice;
    maxPrice = minPrice;
    minPrice = tempValue;
  }

  const minPercentage = ((minPrice - 0) / 600000) * 100;
  const maxPercentage = ((maxPrice - 0) / 600000) * 100;

  rangeFill.style.left = minPercentage + "%";
  rangeFill.style.width = maxPercentage - minPercentage + "%";

  minValue.innerHTML = "₡" + minPrice;
  maxValue.innerHTML = "₡" + maxPrice;

  minpriceFilter = minPrice;
  maxpriceFilter = maxPrice;
}

const inputElements = document.querySelectorAll("input");

// Add an event listener to each input element
inputElements.forEach((element) => {
  element.classList.contains('search-bar-input')? "" : element.addEventListener("input", validateRange);
});

// Initial call to validateRange
validateRange();
  