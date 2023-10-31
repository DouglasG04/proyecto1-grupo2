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


uploadPhotoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            previewImage.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
})

entitydocFront.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        labelFront.innerText = "Modificar foto delantera del documento"
        const reader = new FileReader();
        reader.onloadend = () => {
            entityFrontPreview.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
})

entitydocBack.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        labelBack.innerText = "Modificar foto trasera del documento"
        const reader = new FileReader();
        reader.onloadend = () => {
            entityBackPreview.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
})


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

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const password = document.getElementById('passwordreg').value;
    const passwordverification = document.getElementById('passwordverification').value;
    const email = document.getElementById('emailreg').value;
    const birthdate = document.getElementById('birthdate').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const additionaladdress = document.getElementById('additionaladdress').value;

    const FormData = {
        name,
        lastname,
        password,
        uploadPhoto: previewImage.src,
        entitydocFront: entityFrontPreview.src,
        entitydocBack: entityBackPreview.src,
        email,
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
    }else if(FormData.uploadPhoto.toString().includes('file:') 
    && FormData.entitydocFront.toString().includes('file:') 
    && FormData.entitydocBack.toString().includes('file:')){
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
            FormData.uploadPhoto.toString().includes('data:image') &&
            FormData.uploadPhoto.toString().includes('data:image') &&
            FormData.uploadPhoto.toString().includes('data:image'))
    ) {
        fetch('http://localhost:1234/api/user/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormData)
        }).then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        title: '¡Cuenta creada!',
                        text: 'Tu cuenta ha sido creada exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Iniciar sesión'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/login'
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

