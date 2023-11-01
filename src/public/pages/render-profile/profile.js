function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

document.addEventListener('DOMContentLoaded', () => {
  const addMethodPaymentBtn = document.getElementById('addMethod');

  addMethodPaymentBtn.addEventListener('click', async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Método de Pago',
      html:
        `<input id="swal-input1" class="swal2-input">` +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  });
});
