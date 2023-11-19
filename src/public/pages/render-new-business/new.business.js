var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");
var form_4 = document.querySelector(".form_4");
var form_5 = document.querySelector(".form_5");
var form_6 = document.querySelector(".form_6");


var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");
var form_4_btns = document.querySelector(".form_4_btns");
var form_5_btns = document.querySelector(".form_5_btns");
var form_6_btns = document.querySelector(".form_6_btns");


var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");
var form_3_next_btn = document.querySelector(".form_3_btns .btn_next");
var form_4_back_btn = document.querySelector(".form_4_btns .btn_back");
var form_4_next_btn = document.querySelector(".form_4_btns .btn_next");
var form_5_back_btn = document.querySelector(".form_5_btns .btn_back");
var form_5_next_btn = document.querySelector(".form_5_btns .btn_next");
var form_6_back_btn = document.querySelector(".form_6_btns .btn_back");
var form_6_next_btn = document.querySelector(".form_6_btns .btn_next");



var form_2_progessbar = document.querySelector(".form_2_progessbar");
var form_3_progessbar = document.querySelector(".form_3_progessbar");
var form_4_progessbar = document.querySelector(".form_4_progessbar");
var form_5_progessbar = document.querySelector(".form_5_progessbar");
var form_6_progessbar = document.querySelector(".form_6_progessbar");

const btn_done = document.querySelector(".btn_done");

form_1_next_btn.addEventListener("click", function () {
	form_1.style.display = "none";
	form_2.style.display = "block";

	form_1_btns.style.display = "none";
	form_2_btns.style.display = "flex";

	form_2_progessbar.classList.add("active");
});

form_2_back_btn.addEventListener("click", function () {
	form_1.style.display = "block";
	form_2.style.display = "none";

	form_1_btns.style.display = "flex";
	form_2_btns.style.display = "none";

	form_2_progessbar.classList.remove("active");
});

form_2_next_btn.addEventListener("click", function () {
	form_2.style.display = "none";
	form_3.style.display = "block";

	form_3_btns.style.display = "flex";
	form_2_btns.style.display = "none";

	form_3_progessbar.classList.add("active");
});



form_3_back_btn.addEventListener("click", function () {
	form_2.style.display = "block";
	form_3.style.display = "none";

	form_3_btns.style.display = "none";
	form_2_btns.style.display = "flex";

	form_3_progessbar.classList.remove("active");
});

form_3_next_btn.addEventListener("click", function () {
	form_3.style.display = "none";
	form_4.style.display = "block";

	form_4_btns.style.display = "flex";
	form_3_btns.style.display = "none";

	form_4_progessbar.classList.add("active");
});


form_4_back_btn.addEventListener("click", function () {
	form_3.style.display = "block";
	form_4.style.display = "none";

	form_4_btns.style.display = "none";
	form_3_btns.style.display = "flex";

	form_4_progessbar.classList.remove("active");
});

form_4_next_btn.addEventListener("click", function () {
	form_4.style.display = "none";
	form_5.style.display = "block";

	form_5_btns.style.display = "flex";
	form_4_btns.style.display = "none";

	form_5_progessbar.classList.add("active");
});

form_5_back_btn.addEventListener("click", function () {
	form_4.style.display = "block";
	form_5.style.display = "none";

	form_5_btns.style.display = "none";
	form_4_btns.style.display = "flex";

	form_5_progessbar.classList.remove("active");
});

form_5_next_btn.addEventListener("click", function () {
	form_5.style.display = "none";
	form_6.style.display = "block";

	form_6_btns.style.display = "flex";
	form_5_btns.style.display = "none";

	form_6_progessbar.classList.add("active");
});

form_6_back_btn.addEventListener("click", function () {
	form_5.style.display = "block";
	form_6.style.display = "none";

	form_6_btns.style.display = "none";
	form_5_btns.style.display = "flex";

	form_6_progessbar.classList.remove("active");
});


mapboxgl.accessToken = 'pk.eyJ1IjoiZ3huemFjciIsImEiOiJjbHA0bjg1YjMxN3hpMmtxdnNyYTJ0NmNoIn0.KrvYzp3qOeE4hvo-eMvy4g';
const map = new mapboxgl.Map({
	container: 'map',

	style: 'mapbox://styles/mapbox/streets-v12',
	center: [-84.091, 9.932],
	zoom: 5
});

/* Given a query in the form "lng, lat" or "lat, lng"
* returns the matching geographic coordinate(s)
* as search results in carmen geojson format,
* https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
const coordinatesGeocoder = function (query) {
	// Match anything which looks like
	// decimal degrees coordinate pair.
	const matches = query.match(
		/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
	);
	if (!matches) {
		return null;
	}

	function coordinateFeature(lng, lat) {
		return {
			center: [lng, lat],
			geometry: {
				type: 'Point',
				coordinates: [lng, lat]
			},
			place_name: 'Lat: ' + lat + ' Lng: ' + lng,
			place_type: ['coordinate'],
			properties: {},
			type: 'Feature'
		};
	}

	const coord1 = Number(matches[1]);
	const coord2 = Number(matches[2]);
	const geocodes = [];

	if (coord1 < -90 || coord1 > 90) {
		// must be lng, lat
		geocodes.push(coordinateFeature(coord1, coord2));
	}

	if (coord2 < -90 || coord2 > 90) {
		// must be lat, lng
		geocodes.push(coordinateFeature(coord2, coord1));
	}

	if (geocodes.length === 0) {
		// else could be either lng, lat or lat, lng
		geocodes.push(coordinateFeature(coord1, coord2));
		geocodes.push(coordinateFeature(coord2, coord1));
	}

	return geocodes;
};



// Add the control to the map.
map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		localGeocoder: coordinatesGeocoder,
		zoom: 1,
		placeholder: 'Busca: Costa Rica, San José',
		mapboxgl: mapboxgl,
		reverseGeocode: true
	})
);

const idSession = localStorage.getItem('sessionToken');
const idUser = localStorage.getItem('session');


const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const img5 = document.getElementById("img5");

const img1Preview = document.getElementById("img1Preview");
const img2Preview = document.getElementById("img2Preview");
const img3Preview = document.getElementById("img3Preview");
const img4Preview = document.getElementById("img4Preview");
const img5Preview = document.getElementById("img5Preview");

const editImg1 = document.querySelector(".fa-x1");
const editImg2 = document.querySelector(".fa-x2");
const editImg3 = document.querySelector(".fa-x3");
const editImg4 = document.querySelector(".fa-x4");
const editImg5 = document.querySelector(".fa-x5");


'use strict';
let widget_cloudinary = cloudinary.createUploadWidget({
	cloudName: 'dwsbnp0s2',
	uploadPreset: 'lcs0xelu'
}, (err, result) => {
	if (!err && result && result.event === "success") {
		img1Preview.setAttribute("src", result.info.secure_url);
	}
});

let widget_cloudinary2 = cloudinary.createUploadWidget({
	cloudName: 'dwsbnp0s2',
	uploadPreset: 'lcs0xelu'
}, (err, result) => {
	if (!err && result && result.event === "success") {
		img2Preview.setAttribute("src", result.info.secure_url);
	}
});

let widget_cloudinary3 = cloudinary.createUploadWidget({
	cloudName: 'dwsbnp0s2',
	uploadPreset: 'lcs0xelu'
}, (err, result) => {
	if (!err && result && result.event === "success") {
		img3Preview.setAttribute("src", result.info.secure_url);
	}
});

let widget_cloudinary4 = cloudinary.createUploadWidget({
	cloudName: 'dwsbnp0s2',
	uploadPreset: 'lcs0xelu'
}, (err, result) => {
	if (!err && result && result.event === "success") {
		img4Preview.setAttribute("src", result.info.secure_url);
	}
});

let widget_cloudinary5 = cloudinary.createUploadWidget({
	cloudName: 'dwsbnp0s2',
	uploadPreset: 'lcs0xelu'
}, (err, result) => {
	if (!err && result && result.event === "success") {
		img5Preview.setAttribute("src", result.info.secure_url);
	}
});



// CLOUDINARY
img1.addEventListener('click', () => {
	widget_cloudinary.open();
	img1Preview.style.display = "block";
	img1.style.display = "none";
	editImg1.classList.remove("hide-element")
	editImg1.classList.add("show-element")
}, false)

img2.addEventListener('click', () => {
	widget_cloudinary2.open();
	img2Preview.style.display = "block";
	img2.style.display = "none";
	editImg2.classList.remove("hide-element")
	editImg2.classList.add("show-element")
}, false)

img3.addEventListener('click', () => {
	widget_cloudinary3.open();
	img3Preview.style.display = "block";
	img3.style.display = "none";
	editImg3.classList.remove("hide-element")
	editImg3.classList.add("show-element")
}, false)

img4.addEventListener('click', () => {
	widget_cloudinary4.open();
	img4Preview.style.display = "block";
	img4.style.display = "none";
	editImg4.classList.remove("hide-element")
	editImg4.classList.add("show-element")

}, false)


img5.addEventListener('click', () => {
	widget_cloudinary5.open();
	img5Preview.style.display = "block";
	img5.style.display = "none";
	editImg5.classList.remove("hide-element")
	editImg5.classList.add("show-element")

}, false)


editImg1.addEventListener('click', () => {
	img1Preview.style.display = "none";
	img1.style.display = "block";
	editImg1.classList.add("hide-element")
})

editImg2.addEventListener('click', () => {
	img2Preview.style.display = "none";
	img2.style.display = "block";
	editImg2.classList.add("hide-element")
})


editImg3.addEventListener('click', () => {
	img3Preview.style.display = "none";
	img3.style.display = "block";
	editImg3.classList.add("hide-element")
})


editImg4.addEventListener('click', () => {
	img4Preview.style.display = "none";
	img4.style.display = "block";
	editImg4.classList.add("hide-element")
})


editImg5.addEventListener('click', () => {
	img5Preview.style.display = "none";
	img5.style.display = "block";
	editImg5.classList.add("hide-element")
})


const radioButtons = document.querySelectorAll('input[type="radio"]');
let selectedCategory = '';

radioButtons.forEach(button => {
	button.addEventListener('click', function () {
		selectedCategory = this.value;
	});
});




btn_done.addEventListener("click", function () {

	const province = document.getElementById("province").value;
	const city = document.getElementById("city").value;
	const address = document.getElementById("address").value;
	const address_two = document.getElementById("address_two").value;
	const address_three = document.getElementById("address_three").value;



	const name = document.getElementById("businessName").value;
	const phone = document.getElementById("businessPhone").value;
	const price = document.getElementById("price").value;
	const description = document.getElementById("description").value;



	const photos = [
		img1Preview.src,
		img2Preview.src,
		img3Preview.src,
		img4Preview.src,
		img5Preview.src
	];

	const mapdirection = document.querySelector(".mapboxgl-ctrl-geocoder--input").value;


	const data = {
		name,
		phone,
		price,
		description,
		photos,
		mapdirection,
		province,
		city,
		
		address,
		address_two,
		address_three,
		category: selectedCategory,
		statusBusiness: false,
	};

	if (province == "" || city == "" || address == "" || address_two == "" || address_three == "" || name == "" || price == "" || description == "" || photos.length == 0 || mapdirection == "" || selectedCategory == "") {
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
			icon: 'error',
			title: 'Faltan campos por llenar!'
		})
	} else {

		fetch(`http://localhost:1234/api/user/business/new/6555603df4526d0724350314`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(response => response.json())
			.then(data => {
				if (data.status === 200) {

					Swal.fire({
						title: '¡Éxito!',
						text: 'Se registró el negocio, espera que sea aprobado por un administrador',
						icon: 'success',
						confirmButtonText: 'Aceptar',
					}).then((result) => {
						if (result.isConfirmed) {
							window.location.href = "http://127.0.0.1:5500/src/public/pages/index.html"
						}
					})

				} else {
					Swal.fire({
						title: '¡Error!',
						text: 'No se pudo registrar el negocio',
						icon: 'error',
						confirmButtonText: 'Aceptar',
					})
				}
			})


	}


})

