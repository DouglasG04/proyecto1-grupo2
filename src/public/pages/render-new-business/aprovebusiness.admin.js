window.onload = function () {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3huemFjciIsImEiOiJjbHA0bjg1YjMxN3hpMmtxdnNyYTJ0NmNoIn0.KrvYzp3qOeE4hvo-eMvy4g';
    const map = new mapboxgl.Map({
        container: 'map',

        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-84.091, 9.932],
        zoom: 5
    });

    /* Given a query in the form "lng, lat" or "lat, lng"
    * returns the matching geographic coordinate(s)
    * as search results in carmen geojson format,
    * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
    const coordinatesGeocoder = function (query) {
        // Match anything which looks like
        // decimal degrees coordinate pair.
        const matches = query.match(
            /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
        );
        if (!matches) {
            return null;
        }

        function coordinateFeature(lng, lat) {
            return {
                center: [lng, lat],
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                place_name: 'Lat: ' + lat + ' Lng: ' + lng,
                place_type: ['coordinate'],
                properties: {},
                type: 'Feature'
            };
        }

        const coord1 = Number(matches[1]);
        const coord2 = Number(matches[2]);
        const geocodes = [];

        if (coord1 < -90 || coord1 > 90) {
            // must be lng, lat
            geocodes.push(coordinateFeature(coord1, coord2));
        }

        if (coord2 < -90 || coord2 > 90) {
            // must be lat, lng
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        if (geocodes.length === 0) {
            // else could be either lng, lat or lat, lng
            geocodes.push(coordinateFeature(coord1, coord2));
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        return geocodes;
    };



    // Add the control to the map.
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            localGeocoder: coordinatesGeocoder,
            zoom: 1,
            placeholder: 'Busca: Costa Rica, San José',
            mapboxgl: mapboxgl,
            reverseGeocode: true
        })
    );


    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    const businessId = urlParams.get('businessId');


    fetch(`http://localhost:1234/api/user/business/${userId}/${businessId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .then(data => {
            if (data.status === 200) {
                const business = data.business;
                const user = data.user;

                const userPhoto = document.getElementById('photoUserBusiness');
                const userName = document.getElementById('usernameBusiness');
                const idFrontBusiness = document.getElementById('idFrontBusiness');
                const idBackBusiness = document.getElementById('idBackBusiness');
                const emailBusiness = document.getElementById('emailBusiness');
                const idCardBusiness = document.getElementById('idCardBusiness');

                const category = document.getElementById('category');
                const name = document.getElementById('name');
                const description = document.getElementById('description');
                const price = document.getElementById('price');
                const phone = document.getElementById('phone');
                const photoContainer = document.getElementById('photos');



                const province = document.getElementById('province');
                const state = document.getElementById('city');
                const address = document.getElementById('address');
                const address2 = document.getElementById('address_two');
                const address3 = document.getElementById('address_three');
                const mapdirection = document.querySelector(".mapboxgl-ctrl-geocoder--input");


                category.innerText = business.category;
                name.innerText = business.name;
                description.innerText = business.generaldescription;
                price.innerText = business.price;
                phone.innerText = business.phonenumber;

                state.value = business.state;
                province.value = business.province;
                address.value = business.direccion;
                address2.value = business.direccion2 || "No hay dirección adicional";
                address3.value = business.direccion3 || "No hay dirección adicional";
                mapdirection.value = business.mapdirection;


                business.photos.forEach(p => {
                    const img = document.createElement('img');
                    img.src = p;
                    img.className = 'img-fluid';
                    photoContainer.appendChild(img);
                });


                userPhoto.src = user.personalphoto;
                userName.innerText = `${user.name} ${user.lastname}`;
                idCardBusiness.innerText = `Cedula: ${user.idcard}`;
                idFrontBusiness.src = user.entitydocumentfront;
                idBackBusiness.src = user.entitydocumentback;
                emailBusiness.value = user.email;
            }
        })


    const btnAcceptBusiness = document.getElementById('acceptBusiness');
    const btnRejectBusiness = document.getElementById('rejectBusiness');


    btnAcceptBusiness.addEventListener('click', () => {
        const status = true;

        fetch(`http://localhost:1234/api/user/business/6555603df4526d0724350314/65599af254ae718c3f8691aa`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status })
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
                            window.location.href = "http://127.0.0.1:5500/src/public/pages/index.html"
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
                            window.location.href = "http://127.0.0.1:5500/src/public/pages/index.html"
                        }
                    })
                }
            })
    })

    btnRejectBusiness.addEventListener('click', () => {

        const status = false;
        fetch(`http://localhost:1234/api/user/business/6555603df4526d0724350314/65599af254ae718c3f8691aa`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status })
        }).then((response) => response.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Se ha denegado el negocio',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "http://127.0.0.1:5500/src/public/pages/index.html"
                        }
                    })
                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: 'No se pudo denegar el negocio',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "http://127.0.0.1:5500/src/public/pages/index.html"
                        }
                    })
                }
            })
    })


}

