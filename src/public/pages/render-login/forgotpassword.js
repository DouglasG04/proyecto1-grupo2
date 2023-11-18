const form = document.getElementById('forgotPassword');
const email = document.getElementById('email');




form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('http://localhost:1234/api/user/recover', {
        method: 'POST',
        body: JSON.stringify({ email: email.value }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Se ha enviado un correo a tu cuenta',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-login/login.html';
                    }
                });
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: 'El correo no existe',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});




