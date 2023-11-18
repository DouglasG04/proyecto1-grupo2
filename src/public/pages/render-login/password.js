
const formNewPassword = document.getElementById('newPassword');



formNewPassword.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('verifypassword').value;


    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (password && confirmPassword) {
        if (password === confirmPassword) {
            if (!passwordRegex.test(password)) {
                Swal.fire({
                    title: '¡Contraseña inválida!',
                    text: 'Por favor, verifica que tu contraseña tenga al menos 8 digitos, un número, una mayúscula, una minúscula y un carácter especial para ser aceptada.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });

                return;

            } else {
                try {
                    const urlParams = new URLSearchParams(window.location.search);
                    const userId = urlParams.get('id');

                    const response = await fetch(`http://localhost:1234/api/user/recover/${userId}`, {
                        method: 'POST',
                        body: JSON.stringify({ password }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await response.json();

                    if (data.status === 200) {
                        Swal.fire({
                            title: '¡Contraseña actualizada!',
                            text: 'Tu contraseña ha sido actualizada exitosamente',
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
                            text: 'Hubo un problema al actualizar tu contraseña',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'Ingresa una contraseña',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

})