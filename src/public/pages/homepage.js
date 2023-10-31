let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 10000); // Change image every 10 seconds
}

const businesses = [{
  photography: "/src/public/assets/img/image1.jpg",
  name: "El Mirador",
  location: "Montes de Oro",
  price: "65.000",
},
{
  photography: "/src/public/assets/img/image2.jpg",
  name: "Sky Tram",
  location: "Arenal",
  price: "15.000",
},
{
  photography: "/src/public/assets/img/image3.jpg",
  name: "Negra's Place",
  location: "Punta Uva",
  price: "6.000",
},
{
  photography: "/src/public/assets/img/image4.jpg",
  name: "Tropical Lodge",
  location: "Esterillos",
  price: "25.000",
},
{
  photography: "/src/public/assets/img/image5.jpg",
  name: "Surf School",
  location: "Santa Teresa",
  price: "7.000",
},
{
  photography: "/src/public/assets/img/image6.jpg",
  name: "Soda Guetto Girl",
  location: "Puerto Viejo",
  price: "8.000",
},
{
  photography: "/src/public/assets/img/image7.jpg",
  name: "Sky Walk",
  location: "Monteverde",
  price: "15.000",
},
{
  photography: "/src/public/assets/img/image8.jpg",
  name: "Donde Tere",
  location: "Fraijanes",
  price: "10.000",
},
{
  photography: "/src/public/assets/img/image9.jpg",
  name: "Tamarindo nightlife",
  location: "Tamarindo",
  price: "5.000",
},
{
  photography: "/src/public/assets/img/image10.jpg",
  name: "El Bosque",
  location: "Santa Elena",
  price: "45.000",
},
{
  photography: "/src/public/assets/img/image11.jpg",
  name: "Tico y Rico",
  location: "Playa del Coco",
  price: "15.000",
},
{
  photography: "/src/public/assets/img/image12.jpg",
  name: "Kerwá hostel",
  location: "Brasilito",
  price: "30.000",
}];

window.onload = function () {
  renderlist();
};

function renderlist() {
  const businessesContainer = document.getElementById("businessesList")
  businesses.forEach(function(business){
    businessesContainer.innerHTML +=
    `<div class="card-business">
      <img class="business-photograpy" src='${business.photography}'/>
      <p class="card-business-title">${business.name}, ${business.location}</p>
      <p class="card-business-price"><i class="fa-solid  fa-colon-sign"></i>${business.price}</p>
    </div>`;
  });
}