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

var btn_done = document.querySelector(".btn_done");

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




const idSession = localStorage.getItem('sessionToken');
const idUser = localStorage.getItem('session');


btn_done.addEventListener("click", function () {
	const hospedaje = document.getElementById("hospedaje").value;
	const alimentacion = document.getElementById("alimentacion").value;
	const entretenimiento = document.getElementById("entretenimiento").value;
	const province = document.getElementById("province").value;
	const city = document.getElementById("city").value;
	const address = document.getElementById("address").value;
	const address_two = document.getElementById("address_two").value;
	const address_three = document.getElementById("address_three").value;
	const businessName = document.getElementById("businessName").value;
	const price = document.getElementById("price").value;
	const description = document.getElementById("description").value;


	const data = {
		hospedaje,
		alimentacion,
		entretenimiento,
		province,
		city,
		address,
		address_two,
		address_three,
		businessName,
		price,
		description
	};

	if (hospedaje == "" || alimentacion == "" || entretenimiento == "" || province == "" || city == "" || address == "" || address_two == "" || address_three == "" || businessName == "" || price == "" || description == "") {
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

		fetch(`http://localhost:1234/api/business/new/6555603df4526d0724350314`, {
			method: 'POST',
			body: JSON.stringify(data),
		}).then(response => response.json())
			.then(data => {
				if (data.status === 200) {

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
						title: '¡Negocio registrado!',
						text: 'Seras redirigido a la pagina principal',
						confirmButtonText: 'Aceptar',
					}).then((result) => {
						if (result.isConfirmed) {
							window.location.href = "http://localhost:1234/home";
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

