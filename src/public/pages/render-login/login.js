
const withoutAccount = document.getElementById('withoutAccount');
const loginSection = document.querySelector('.login');
const registerSection = document.querySelector('.register');

const formLogin = document.querySelector('#form-login');
const formRegister = document.querySelector('#form-register');

const uploadPhotoInput = document.getElementById('uploadPhoto');
const previewImage = document.getElementById('preview');
const removePhoto = document.getElementById('removePhoto');

const entitydocFront = document.getElementById('entitydocFront');
const entityFrontPreview = document.getElementById('entitydocFrontPreview');
const labelFront = document.querySelector('.labelFront');
const entitydocBack = document.getElementById('entitydocBack');
const entityBackPreview = document.getElementById('entitydocBackPreview');
const labelBack = document.querySelector('.labelBack');



'use strict';
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dwsbnp0s2',
    uploadPreset: 'lcs0xelu'
}, (err, result) => {
    if (!err && result && result.event === "success") {
        previewImage.setAttribute("src", result.info.secure_url);
    }
});

let widget_cloudinary2 = cloudinary.createUploadWidget({
    cloudName: 'dwsbnp0s2',
    uploadPreset: 'lcs0xelu'
}, (err, result) => {
    if (!err && result && result.event === "success") {
        entityFrontPreview.setAttribute("src", result.info.secure_url);
    }
});

let widget_cloudinary3 = cloudinary.createUploadWidget({
    cloudName: 'dwsbnp0s2',
    uploadPreset: 'lcs0xelu'
}, (err, result) => {
    if (!err && result && result.event === "success") {
        entityBackPreview.setAttribute("src", result.info.secure_url);
    }
});



// CLOUDINARY
uploadPhotoInput.addEventListener('click', () => {
    widget_cloudinary.open();
}, false)

entitydocFront.addEventListener('click', () => {
    widget_cloudinary2.open();
}, false)

entitydocBack.addEventListener('click', () => {
    widget_cloudinary3.open();
}, false)


// uploadPhotoInput.addEventListener('change', (event) => {
//     const file = event.target.files[0];

//     if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             previewImage.src = reader.result;
//         }
//         reader.readAsDataURL(file);
//     }
// })

// entitydocFront.addEventListener('change', (event) => {
//     const file = event.target.files[0];

//     if (file) {
//         labelFront.innerText = "Modificar foto delantera del documento"
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             entityFrontPreview.src = reader.result;
//         }
//         reader.readAsDataURL(file);
//     }
// })

// entitydocBack.addEventListener('change', (event) => {
//     const file = event.target.files[0];

//     if (file) {
//         labelBack.innerText = "Modificar foto trasera del documento"
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             entityBackPreview.src = reader.result;
//         }
//         reader.readAsDataURL(file);
//     }
// })


removePhoto.addEventListener('click', () => {
    previewImage.src = '/img/avatar.png';
    uploadPhotoInput.value = '';
})

withoutAccount.addEventListener('click', () => {
    loginSection.classList.add('hide-element');
    registerSection.classList.remove('hide-element');
    document.title = 'Registrar cuenta | Kupaa';
});


formRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('usernameRegister').value;
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const idcard = document.getElementById('idcard').value;
    const password = document.getElementById('passwordreg').value;
    const passwordverification = document.getElementById('passwordverification').value;
    const email = document.getElementById('emailreg').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const birthdate = document.getElementById('birthdate').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const additionaladdress = document.getElementById('additionaladdress').value;

    const FormData = {
        username,
        name,
        lastname,
        idcard,
        password,
        personalphoto: previewImage.src,
        entitydocumentfront: entityFrontPreview.src,
        entitydocumentback: entityBackPreview.src,
        email,
        phonenumber,
        birthdate,
        country,
        state,
        additionaladdress,
    }

    if (password !== passwordverification) {
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
            icon: 'warning',
            title: 'Las contraseña no coinciden'
        })
    } else if (FormData.personalphoto.toString().includes('file:') ||
        FormData.entitydocumentfront.toString().includes('file:') ||
        FormData.entitydocumentback.toString().includes('file:')) {
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
            icon: 'warning',
            title: 'Faltan imagenes por subir'
        })
    }


    else if (
        (password === passwordverification &&
            FormData.personalphoto.toString().includes('cloudinary') &&
            FormData.entitydocumentfront.toString().includes('cloudinary') &&
            FormData.entitydocumentback.toString().includes('cloudinary'))
    ) {
        fetch('http://localhost:1234/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormData)
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    Swal.fire({
                        title: '¡Cuenta creada!',
                        text: 'Tu cuenta ha sido creada exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Iniciar sesión'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-login/login.html'
                        }
                    })
                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: 'Ha ocurrido un error al crear tu cuenta',
                        icon: 'error',
                        confirmButtonText: 'Intentar de nuevo'
                    })
                }


            })
    }




})

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const FormData = {
        username: username.toLowerCase(),
        email,
        password
    }

    fetch('http://localhost:1234/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)
    }).then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                localStorage.setItem('session', JSON.stringify(data.loginUser._id));
                localStorage.setItem('sessionToken', JSON.stringify(data.token._id));

                Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Has iniciado sesión exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "http://127.0.0.1:5500/src/public/pages/index.html"
                    }
                })
            } else if (data.status === 404) {
                Swal.fire({
                    title: '¡Error!',
                    text: 'Ha ocurrido un error al iniciar sesión',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                })
            }
        })

})

