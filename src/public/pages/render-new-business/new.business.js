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



//Fotografias
let imagen1 = "";
let imagen2 = "";
let imagen3 = "";
let imagen4 = "";
let imagen5 = "";

window.onload = function () {
  const button1 = document.getElementById("img1");
  const previstaImagen1 = document.getElementById("pre-img1");
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dwsbnp0s2",
      uploadPreset: "lcs0xelu",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        previstaImagen1.src = result.info.url;
        imagen1 = result.info.url;
		button1.classList.add("hide-element");
      }
    }
  );

  button1.addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );

  const button2 = document.getElementById("img2");
  const previstaImagen2 = document.getElementById("pre-img2");
  const myWidget2 = cloudinary.createUploadWidget(
    {
      cloudName: "dwsbnp0s2",
      uploadPreset: "lcs0xelu",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        previstaImagen2.src = result.info.url;
        imagen2 = result.info.url;
		button2.classList.add("hide-element");
      }
    }
  );

  button2.addEventListener(
    "click",
    function () {
      myWidget2.open();
    },
    false
  );

  const button3 = document.getElementById("img3");
  const previstaImagen3 = document.getElementById("pre-img3");
  const myWidget3 = cloudinary.createUploadWidget(
    {
      cloudName: "dwsbnp0s2",
      uploadPreset: "lcs0xelu",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        previstaImagen3.src = result.info.url;
        imagen3 = result.info.url;
		button3.classList.add("hide-element");
      }
    }
  );

  button3.addEventListener(
    "click",
    function () {
      myWidget3.open();
    },
    false
  );

  const button4 = document.getElementById("img4");
  const previstaImagen4 = document.getElementById("pre-img4");
  const myWidget4 = cloudinary.createUploadWidget(
    {
      cloudName: "dwsbnp0s2",
      uploadPreset: "lcs0xelu",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        previstaImagen4.src = result.info.url;
        imagen4 = result.info.url;
		button4.classList.add("hide-element");
      }
    }
  );

  button4.addEventListener(
    "click",
    function () {
      myWidget4.open();
    },
    false
  );

  const button5 = document.getElementById("img5");
  const previstaImagen5 = document.getElementById("pre-img5");
  const myWidget5 = cloudinary.createUploadWidget(
    {
      cloudName: "dwsbnp0s2",
      uploadPreset: "lcs0xelu",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        previstaImagen5.src = result.info.url;
        imagen5 = result.info.url;
		button5.classList.add("hide-element");
      }
    }
  );

  button5.addEventListener(
    "click",
    function () {
      myWidget5.open();
    },
    false
  );
};



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

	if(hospedaje == "" || alimentacion == "" || entretenimiento == "" || province == "" || city == "" || address == "" || address_two == "" || address_three == "" || businessName == "" || price == "" || description == ""){
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
	}else{
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
			title: 'Negocio registrado con exito!'
		})
	}

	
})

