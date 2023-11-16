let dataUser;

const dateYear = new Date().getFullYear();
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onload = function () {
    const currentPage = window.location.href.split('/').pop();

    
    const idSession = localStorage.getItem('sessionToken');
    const idUser = localStorage.getItem('session');
    

    fetch(`http://localhost:1234/api/user/6555603df4526d0724350314`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        const userType = data.user.typeofuser;
        handleNavBarByRole(userType, currentPage);
    });





    








    const addMethod = document.getElementById('addMethod');

    const hiUser = document.getElementById('hiUser');
    const userPhoto = document.getElementById('userImg');
    const detailAge = document.querySelector('.detailAge');
    const detailName = document.querySelector('.detailName');
    const detailEmail = document.querySelector('.detailEmail');

    const name = document.getElementById('name');
    const lastname = document.getElementById('lastname');
    const idcard = document.getElementById('idcard');
    const birthdate = document.getElementById('birthdate');

    const phonenumber = document.getElementById('phonenumber');
    const country = document.getElementById('country');
    const state = document.getElementById('state');
    const address = document.getElementById('additionaladdress');
    const typeOfUser = document.getElementById('typeUser');

    const btnSaveUser = document.getElementById('saveUser');
    const btnDeleteUser = document.getElementById('deleteUser');

    const tableBody = document.querySelector('.data-body-payment');


    fetch(`http://localhost:1234/api/user/6555603df4526d0724350314`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            dataUser = data.user;

            hiUser.innerHTML = `Hola ${data.user.name}!`;
            detailName.innerHTML = data.user.name + ' ' + data.user.lastname;
            detailEmail.innerHTML = data.user.email;
            userPhoto.src = data.user.personalphoto;

            const convertAge = new Date(data.user.birthdate);
            const age = dateYear - convertAge.getFullYear();
            detailAge.innerHTML = `Edad: ${age}`;

            name.value = data.user.name;
            lastname.value = data.user.lastname;
            idcard.value = data.user.idcard;
            birthdate.value = data.user.birthdate;
            email.value = data.user.email;
            phonenumber.value = data.user.phonenumber;
            country.value = data.user.country;
            state.value = data.user.state;
            address.value = data.user.additionaladdress;
            typeOfUser.value = data.user.typeofuser;


            data.user.paymentmethods.forEach((element) => {
                const iconType = element.bank;
                let iconHTML;
                let nameBank;

                if (iconType === 'BAC') {
                    iconHTML = '<img src="../../assets/svg/BAC.svg" alt="BAC">';
                    nameBank = 'BAC';
                } else if (iconType === 'VS') {
                    iconHTML = '<i class="fa-brands fa-cc-visa"></i>';
                    nameBank = 'Visa';
                }

                tableBody.innerHTML += `
                    <tr class="data-row" data-method-id="${element._id}">
                        <td class="bank-icon">${iconHTML}</td>
                        <td>
                            <p class="cardnumber">${nameBank} ${element.cardnumber}</p>
                            <p class="expirationdate">Expiracion: ${element.expirationmonth}/${element.experationyear}</p>
                        </td>
                        <td>
                            <button id="deleteMethod">Eliminar</button>
                        </td>
                    </tr>
                `;
            });

        })



    btnSaveUser.addEventListener('click', (event) => {
        event.preventDefault();

        const FormData = {
            name: name.value,
            lastname: lastname.value,
            idcard: idcard.value,
            birthdate: birthdate.value,
            phonenumber: phonenumber.value,
            country: country.value,
            state: state.value,
            additionaladdress: address.value,
            typeofuser: typeOfUser.value,
        }

        fetch(`http://localhost:1234/api/user/6555603df4526d0724350314`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(FormData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                Swal.fire({
                    title: '¡Datos actualizados!',
                    text: 'Tus datos han sido actualizados exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
            })

    })


    btnDeleteUser.addEventListener('click', (event) => {
        event.preventDefault();

        fetch(`http://localhost:1234/api/user/6555603df4526d0724350314`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    Swal.fire({
                        title: '¡Cuenta eliminada!',
                        text: 'Tu cuenta ha sido eliminada exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('session');
                            window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-login/login.html';
                        }
                    })

                }

            })
    })



    tableBody.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName.toLowerCase() === 'button' && target.id === 'deleteMethod') {
            const row = target.closest('.data-row');
            const methodId = row.dataset.methodId;

            if (methodId) {

                fetch(`http://localhost:1234/api/user/paymentmethod/6555603df4526d0724350314/${methodId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        Swal.fire({
                            title: '¡Tarjeta eliminada!',
                            text: 'Tu tarjeta ha sido eliminada exitosamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        });

                        // Eliminar la fila de la tabla
                        tableBody.removeChild(row);
                    })
                    .catch((error) => {
                        console.error('Error eliminando tarjeta:', error);
                    });
            }
        }
    });








    addMethod.addEventListener('click', () => {

        const closePopup = document.getElementById('closePopup');
        const addCard = document.getElementById('addCard');
        const popup = document.getElementById('popup');

        popup.classList.remove('hide-element');
        popup.classList.add('show-element');


        closePopup.addEventListener('click', () => {
            popup.classList.add('show-element');
            popup.classList.add('hide-element');
        })

        addCard.addEventListener('click', (event) => {
            event.preventDefault();

            const headline = document.getElementById('headline');
            const cardNumber = document.getElementById('cardnumber');
            const expirationMonth = document.getElementById('expirationmonth');
            const expirationYear = document.getElementById('expirationyear');
            const cvv = document.getElementById('cvv');
            const bank = document.getElementById('bank');

            const FormData = {
                headline: headline.value.toUpperCase(),
                cardnumber: cardNumber.value,
                expirationmonth: expirationMonth.value,
                experationyear: expirationYear.value,
                cvv: cvv.value,
                bank: bank.value,
            }

            fetch(`http://localhost:1234/api/user/paymentmethod/6555603df4526d0724350314`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FormData)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    Swal.fire({
                        title: '¡Tarjeta agregada!',
                        text: 'Tu tarjeta ha sido agregada exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })

                    popup.classList.add('hide-element');
                })
        })


    })


    // Event listener for logout button
    const logoutContainer = document.getElementById('myDropdown');

    if (logoutContainer) {
        logoutContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('logout')) {
                handleLogoutClick(event);
            }
        });
    }

    function handleLogoutClick(event) {
        event.preventDefault(); 

        console.log('Logout button clicked!');
        alert('Logout button clicked!');

        console.log('Logout button clicked!');
        fetch(`http://localhost:1234/api/user/logout/654c4d980880e0ef8cd903fb`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    Swal.fire({
                        title: '¡Cerrando Sesión!',
                        text: 'Seras redirigido al inicio de sesión',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('session');
                            window.location.href = 'http://127.0.0.1:5500/src/public/pages/render-login/login.html';
                        }
                    });
                }
            });
    }
}











