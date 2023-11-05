function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
   
    const name = document.getElementById('nombre').value;
    const lastname = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('pais').value;
    const phone = document.getElementById('telefono').value;
    

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
        title: 'Pago exitoso!'
    })
})