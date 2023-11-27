
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onload = function () {
    const currentPage = window.location.href.split('/').pop();

    const popupBusiness = document.getElementById('popupBusiness');
    const closePopupBusiness = popupBusiness.querySelector('.fa-x1');

    if (closePopupBusiness && popupBusiness) {
        closePopupBusiness.addEventListener('click', () => {
            popupBusiness.classList.remove('show-element');
            popupBusiness.classList.add('hide-element');
        });
    }


    const idSessionWithQuotes = localStorage.getItem('sessionToken');
    const idSession = idSessionWithQuotes.replaceAll('"', '');
    
    
    const idUserWithQuotes = localStorage.getItem('session');
    const idUser = idUserWithQuotes.replaceAll('"', '');


    // Load navigation bar by role
    fetch(`http://localhost:1234/api/user/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            userType = data.user.typeofuser;

            const businessRequests = document.querySelector('.section-businessrequests');
            const allBusiness = document.querySelector('.section-allregisteredbusiness');
            const myregisteredBusiness = document.querySelector('.section-myregisteredbusiness');
            const reports = document.querySelector('.section-reports');
            const reservations = document.querySelector('.section-myreservations');
            const paymentMethods = document.querySelector('.section-mymethodpayments');

            [businessRequests, allBusiness, myregisteredBusiness, reports, reservations, paymentMethods].forEach(element => {
                element.classList.add('hide-element');
            });


            if (userType === 'C') {
                reservations.classList.remove('hide-element');
                paymentMethods.classList.remove('hide-element');
            } else if (userType === 'P') {
                myregisteredBusiness.classList.remove('hide-element');
            } else if (userType === 'A') {
                [businessRequests, allBusiness, reports].forEach(element => {
                    element.classList.remove('hide-element');
                });
            }
            handleNavBarByRole(userType, currentPage);
        }).catch((error) => {
            handleNavBarByRole(null, currentPage);
          })


    // Handle sections by user type


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


    // Render user data
    fetch(`http://localhost:1234/api/user/${idUser}`, {
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

            const dateYear = new Date().getFullYear();
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


            //Render payment by user
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

            // Render reservations by user
            const tableBodyReservation = document.querySelector('.data-body-reservations');
            data.user.reservations.forEach((element) => {

                
                tableBodyReservation.innerHTML += `  
                <tr class="data-row">
                <td>₡${element.amount}</td>
                <td>${element.businessName}</td>
                <td>
                    <input type="date" id="checkin" disabled>
                    <input type="date" id="checkout" disabled>
                </td>
                <td>
                  <button id="editReservation">Modificar</button>
                  <button id="cancelReservation">Cancelar</button>
                </td>
              </tr>`;
            });


        })



    // Render business by user
    fetch(`http://localhost:1234/api/user/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                const businesses = data.user.business;

                // Código para actualizar la tabla con la información de negocios
                const tableBodyBusiness = document.querySelector('.data-body-business');

                businesses.forEach((business) => {
                    switch (business.province) {

                        case 'SJ':
                            business.province = 'San José';
                            break;

                        case 'A':
                            business.province = 'Alajuela';
                            break;

                        case 'C':
                            business.province = 'Cartago';
                            break;

                        case 'H':
                            business.province = 'Heredia';
                            break;

                        case 'G':
                            business.province = 'Guanacaste';
                            break;

                        case 'P':
                            business.province = 'Puntarenas';
                            break;

                        case 'L':
                            business.province = 'Limón';
                            break;
                    }

                    tableBodyBusiness.innerHTML += `
                            <tr class="data-row">
                                <td>${business.name}</td>
                                <td>${business.state}, ${business.province}</td>
                                <td>${business.statusBusiness === true ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <button class="seeBusiness" data-business-id="${business._id}">Ver</button>
                                </td>
                            </tr>
                        `;
                });

                const seeBusinessButtons = document.querySelectorAll('.seeBusiness');
                const businessContent = document.querySelector('.businessContent');
                const popupBusiness = document.getElementById('popupBusiness');

                seeBusinessButtons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                        const businessId = button.getAttribute('data-business-id');

                        businessContent.innerHTML = '';

                        popupBusiness.classList.remove('hide-element');
                        popupBusiness.classList.add('show-element');

                        fetch(`http://localhost:1234/api/user/business/${idUser}/${businessId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }).then((response) => response.json())
                            .then((data) => {
                                if (data.status === 200) {
                                    switch (data.business.province) {

                                        case 'SJ':
                                            data.business.province = 'San José';
                                            break;

                                        case 'A':
                                            data.business.province = 'Alajuela';
                                            break;

                                        case 'C':
                                            data.business.province = 'Cartago';
                                            break;

                                        case 'H':
                                            data.business.province = 'Heredia';
                                            break;

                                        case 'G':
                                            data.business.province = 'Guanacaste';
                                            break;

                                        case 'P':
                                            data.business.province = 'Puntarenas';
                                            break;

                                        case 'L':
                                            data.business.province = 'Limón';
                                            break;

                                    }

                                    businessContent.innerHTML += `
                                            <h2> Vista previa del negocio </h2>
                                            <h3> ${data.business.name} </h3>
                                            <p> ${data.business.generaldescription} </p>
                                            <p> ${data.business.state}, ${data.business.province} </p>
                                        `;
                                }
                            });
                    });
                });
            }
        });


    // Event listener for save USER changes button
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

        fetch(`http://localhost:1234/api/user/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(FormData)
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    title: '¡Datos actualizados!',
                    text: 'Tus datos han sido actualizados exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })

            })

    })



    // Event listener for delete USER button (ACCOUNT)
    btnDeleteUser.addEventListener('click', (event) => {
        event.preventDefault();

        fetch(`http://localhost:1234/api/user/${idUser}`, {
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


    // Event listener for delete PAYMENT METHOD button
    tableBody.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName.toLowerCase() === 'button' && target.id === 'deleteMethod') {
            const row = target.closest('.data-row');
            const methodId = row.dataset.methodId;

            if (methodId) {

                fetch(`http://localhost:1234/api/user/paymentmethod/${idUser}/${methodId}`, {
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






    // Event listener for add PAYMENT METHOD button

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

            fetch(`http://localhost:1234/api/user/paymentmethod/${idUser}`, {
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

        console.log('Logout button clicked!');
        fetch(`http://localhost:1234/api/user/logout/${idSession}`, {
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



    // Admin dashboard

    let numberOfUsers = 0;
    let totalBusinessCount = 0;

    let numberOfBusinessHospedaje = 0;
    let numberOfBusinessAlimentacion = 0;
    let numberOfBusinessEntretenimiento = 0;

    const totalUsers = document.querySelector('.numberOfUsers');
    const totalBusiness = document.querySelector('.numberOfBusiness');



    fetch(`http://localhost:1234/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            numberOfUsers = data.length;

            const pendingBusiness = document.querySelector('.data-body-allbusiness');
            const registeredBusiness = document.querySelector('.data-body-registeredBusiness');

            // All users
            data.forEach(user => {
                const userBusinessCount = user.business.length;
                totalBusinessCount += userBusinessCount;

                // All business for each user
                user.business.forEach(business => {
                    const userId = user._id;

                    if (business.category === 'Hospedaje') {
                        numberOfBusinessHospedaje++;
                    } else if (business.category === 'Alimentacion') {
                        numberOfBusinessAlimentacion++;
                    } else if (business.category === 'Entretenimiento') {
                        numberOfBusinessEntretenimiento++;
                    }

                    registeredBusiness.innerHTML += `
                    <tr class="dataBusiness" data-method-id="${business._id}" data-user-id="${userId}">
                        <td>${business.name}</td>
                        <td>${business.createdAt}</td>
                        <td>${business.category}</td>
                        <td>
                            <button class="activateBusiness" id="activateBusiness">Activar</button>
                            <button class="desactiveBusiness" id="desactiveBusiness">Inactivar</button>
                        </td>
                    </tr>`;

                    if (business.statusBusiness === false) {
                        pendingBusiness.innerHTML += `
                        <tr class="data-row" data-method-id="${business._id}" data-user-id="${userId}">
                            <td>${business.category}</td>
                            <td>${business.name}</td>
                            <td>${business.createdAt}</td>
                            <td>
                                <button class="acceptRequest" id="acceptRequest">Aceptar</button>
                                <button class="rejectRequest" id="rejectRequest">Rechazar</button>
                            </td>
                        </tr>`;
                    }



                });

            });

            totalUsers.innerHTML = numberOfUsers;
            totalBusiness.innerHTML = totalBusinessCount;

            createCharts();
            updateCharts();

            const acceptRequest = document.querySelectorAll('#acceptRequest');
            const rejectRequest = document.querySelectorAll('#rejectRequest');

            const activateBusiness = document.querySelectorAll('#activateBusiness');
            const desactiveBusiness = document.querySelectorAll('#desactiveBusiness');



            // Change status business in dashboard
            if (acceptRequest) {
                acceptRequest.forEach((button) => {
                    button.addEventListener('click', (e) => {

                        const businessId = e.target.closest('.data-row').dataset.methodId;
                        const userId = e.target.closest('.data-row').dataset.userId;

                        const status = true;

                        fetch(`http://localhost:1234/api/user/business/${userId}/${businessId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ statusBusiness: status })
                        }).then((response) => response.json())
                            .then(data => {
                                if (data.status === 200) {
                                    Swal.fire({
                                        title: '¡Éxito!',
                                        text: 'Se ha aprobado el negocio',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                } else {
                                    Swal.fire({
                                        title: '¡Error!',
                                        text: 'No se pudo aprobar el negocio',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                }
                            })
                    })
                })
            }

            if (rejectRequest) {
                rejectRequest.forEach((button) => {
                    button.addEventListener('click', (e) => {

                        const businessId = e.target.closest('.data-row').dataset.methodId;
                        const userId = e.target.closest('.data-row').dataset.userId;

                        const status = false;

                        fetch(`http://localhost:1234/api/user/business/${userId}/${businessId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ statusBusiness: status })
                        }).then((response) => response.json())
                            .then(data => {
                                if (data.status === 200) {
                                    Swal.fire({
                                        title: '¡Éxito!',
                                        text: 'Se ha rechazado el negocio',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                } else {
                                    Swal.fire({
                                        title: '¡Error!',
                                        text: 'No se pudo rechazar el negocio',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                }
                            })
                    })
                })

            }



            if (activateBusiness) {
                activateBusiness.forEach((button) => {
                    button.addEventListener('click', (e) => {
                        const businessId = e.target.closest('.dataBusiness').dataset.methodId;
                        const userId = e.target.closest('.dataBusiness').dataset.userId;

                        const status = true;

                        fetch(`http://localhost:1234/api/user/business/${userId}/${businessId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ statusBusiness: status })
                        }).then((response) => response.json())
                            .then(data => {
                                if (data.status === 200) {
                                    Swal.fire({
                                        title: '¡Éxito!',
                                        text: 'Se ha activado el negocio',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                } else {
                                    Swal.fire({
                                        title: '¡Error!',
                                        text: 'No se pudo activar el negocio',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                }
                            })
                    })
                })
            }


            if (desactiveBusiness) {
                desactiveBusiness.forEach((button) => {
                    button.addEventListener('click', (e) => {
                        const businessId = e.target.closest('.dataBusiness').dataset.methodId;
                        const userId = e.target.closest('.dataBusiness').dataset.userId;

                        const status = false;

                        fetch(`http://localhost:1234/api/user/business/${userId}/${businessId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ statusBusiness: status })
                        }).then((response) => response.json())
                            .then(data => {
                                if (data.status === 200) {
                                    Swal.fire({
                                        title: '¡Éxito!',
                                        text: 'Se ha desactivado el negocio',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                } else {
                                    Swal.fire({
                                        title: '¡Error!',
                                        text: 'No se pudo desactivar el negocio',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            window.location.reload();
                                        }
                                    })
                                }
                            })
                    })
                })
            }

        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });





    // Charts
    const ctx = document.getElementById('firstChart').getContext('2d');
    const secondChartCanvas = document.getElementById('secondChart').getContext('2d');


    function createCharts() {
        firstChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Usuarios', 'Negocios'],
                datasets: [{
                    label: 'Traffic Source',
                    data: [numberOfUsers, totalBusinessCount],
                    backgroundColor: [
                        'rgba(19, 117, 71, 1)',
                        'rgba(143, 179, 57, 1)'
                    ],
                }]
            },
            options: {
                responsive: true,
            }
        });

        secondChart = new Chart(secondChartCanvas, {
            type: 'bar',
            data: {
                labels: ['Hospedaje', 'Alimentación', 'Entretenimiento'],
                datasets: [{
                    label: 'Negocios',
                    data: [numberOfBusinessHospedaje, numberOfBusinessAlimentacion, numberOfBusinessEntretenimiento],
                    backgroundColor: [
                        'rgba(19, 117, 71, 1)',
                        'rgba(143, 179, 57, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                }]
            },
            options: {
                responsive: true,
            }
        });
    }


    function updateCharts() {
        if (firstChart && secondChart) {
            firstChart.data.datasets[0].data = [numberOfUsers, totalBusinessCount];
            secondChart.data.datasets[0].data = [numberOfBusinessHospedaje, numberOfBusinessAlimentacion, numberOfBusinessEntretenimiento];

            firstChart.update();
            secondChart.update();
        }
    }
}























