const handleNavBarByRole = async (role, page) => {
    const nav = document.querySelector('.nav-container-options');
    const dropdownUserNav = document.getElementById('myDropdown');

    if (role === 'C') {

        switch (page) {
            case 'profile.html':
                nav.innerHTML = ` 
                <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
                <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`

                dropdownUserNav.innerHTML += `
                <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>`

                break;
            case 'contact.html':
                nav.innerHTML = ` 
                <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>`

                dropdownUserNav.innerHTML += `
                <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>`

                break;

            case 'index.html':
                nav.innerHTML = ` 
                <li><a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Mis reservaciones</a></li>
                <li><a href="#businessesList">Buscar y reservar</a></li>
                <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`

                dropdownUserNav.innerHTML += `
              <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>
              `

                break;
        }


        if (page.includes('payment.html')) {
            nav.innerHTML = ` 
            <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
            <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`

            dropdownUserNav.innerHTML += `
            <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>`
        }

        if (page.includes('businesspage.html')) {
            nav.innerHTML = ` 
            <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
            <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`

            dropdownUserNav.innerHTML += `
            <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>`
        }
    } else if (role === 'P') {
        switch (page) {
            case 'profile.html':
                nav.innerHTML = ` 
                <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
                <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`

                dropdownUserNav.innerHTML += `
                <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>`

                break;

            case 'contact.html':
                nav.innerHTML = ` 
                    <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>`

                dropdownUserNav.innerHTML += `
                    <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>`

                break;

            default:
                nav.innerHTML = ` 
                    <li><a href="http://127.0.0.1:5500/src/public/pages/render-new-business/new.business.html">Registrar negocio</a></li>
                    <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`;

                dropdownUserNav.innerHTML += `<a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>`;
        }


        if (page.includes('businesspage.html')) {
            nav.innerHTML = ` 
                <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
                <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`


        }


        if (page.includes('payment.html')) {
            nav.innerHTML = ` 
            <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
            <li><a href="http://127.0.0.1:5500/src/public/pages/render-contact/contact.html">Contáctanos</a></li>`


        }



    } else if (role === 'A') {
        nav.innerHTML = ` 
                <li><a href="http://127.0.0.1:5500/src/public/pages/index.html">Inicio</a></li>
                <li><a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Aprobar/denegar negocios</a></li>`;

        dropdownUserNav.innerHTML += `
                <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Ver/editar perfil</a>
                <a href="http://127.0.0.1:5500/src/public/pages/render-profile/profile.html">Reportes</a>`;
    } else if (role == '' || !role || role == null) {

        switch (page) {
            case 'index.html':
                dropdownUserNav.innerHTML += `
              <a href="http://127.0.0.1:5500/src/public/pages/render-login/login.html">Crear cuenta</a>
              `
                break;


            case 'profile.html':
                dropdownUserNav.innerHTML += `
              <a href="http://127.0.0.1:5500/src/public/pages/render-login/login.html">Crear cuenta</a>
              `

                break;
        }

        if (page.includes('businesspage.html')) {
            dropdownUserNav.innerHTML += `
            <a href="http://127.0.0.1:5500/src/public/pages/render-login/login.html">Crear cuenta</a>
            `


        }


        if (page.includes('payment.html')) {
            dropdownUserNav.innerHTML += `
            <a href="http://127.0.0.1:5500/src/public/pages/render-login/login.html">Crear cuenta</a>
            `


        }

    }
}

