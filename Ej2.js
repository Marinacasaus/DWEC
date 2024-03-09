document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos el contenido donde mostraremos las cosas 
    let contenedor = document.querySelector('#contenedor')

    let paginaActual = 1;
    let totalPaginas;

    // Seleccionamos los elementos del DOM para los botones y el indicador de página
    let botonAnterior = document.querySelector('#anterior');
    let botonSiguiente = document.querySelector('#siguiente');
    let indicadorNumeroPagina = document.querySelector('#numeroPagina');

    // Inicialmente, el botón 'anterior' está deshabilitado porque estamos en la página 1
    botonAnterior.disabled = true;


    // Llamamos a fconexion al cargar la página para obtener la primera página de datos
    fconexion();


    // FUNCIÓN 1. Recoge los datos
    function fconexion(pagina = 1) {

        // Usamos la página pasada como parámetro para la solicitud
        let url = `https://reqres.in/api/users?page=${pagina}`;

        fetch(url)
            .then((resultado) => {
                if (resultado.ok) {
                    return resultado.json();
                } else {
                    throw new Error('Se ha producido un error');
                    // alert ('Se ha producido un error')
                }
            })
            .then(datos => {
                totalPaginas = datos.total_pages;     // Actualizamos el total de páginas
                fmostrarTabla(datos);                // Mostramos la tabla 
                actualizarBotones();                // Actualizamos el estado de los botones de paginación
            })
            .catch(error => console.log(error))
    }



    // FUNCIÓN 2. Actualizar el estado de los botones de paginación
    function actualizarBotones() {
        indicadorNumeroPagina.textContent = paginaActual; // Actualizamos el número de página en el indicador
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual === totalPaginas;
    }

    // Agregamos eventos click a los botones de paginación
    botonAnterior.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            fconexion(paginaActual);
        }
    });

    botonSiguiente.addEventListener('click', () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            fconexion(paginaActual);
        }
    });



    // FUNCIÓN 3. Muestra los datos de la la URL
    function fmostrarTabla(datos) {

        console.log(datos);                    // Para que nos muestre los datos en la consola y saber qué arrays hay, para crear los elementos

        contenedor.innerHTML = '';           // Vacía el contenedor antes de agregar los nuevos resultados 

        // Paso 1. Crear la estructura de la tabla 
        let tabla = document.createElement('table');

        // Paso 2. Iterar sobre el array de datos y crear una fila para cada usuario
        for (let usuario of datos.data) {                           // datos.NOMBRE_ARRAY

            let fila = document.createElement('tr');               // Crea la fila para el usuario

            let nombre = document.createElement('td');           // Crea la celda para el nombre
            nombre.textContent = usuario.first_name;
            fila.append(nombre);

            let email = document.createElement('td');         // Crea la celda para el email
            email.textContent = usuario.email;
            fila.append(email);

            let celdaFoto = document.createElement('td');  // Crea la celda para la foto
            let foto = document.createElement('img');     // Crear imagen
            foto.src = usuario.avatar;
            celdaFoto.append(foto);
            fila.append(celdaFoto);

            fila.classList.add('bloque');
            tabla.append(fila);                       // Añade la fila a la tabla
        }

        // Agregar la tabla al contenedor
        contenedor.append(tabla);
    }

});