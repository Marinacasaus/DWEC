document.addEventListener('DOMContentLoaded', () => {

    // Paso 1. Declarar un array con nombres de personas
    let nombres = ['Pepe', 'Patrick', 'Arturo', 'Isidro', 'Marina', 'Lola'];

    // Paso 2. Seleccionar elementos del DOM
    let listaActiva = document.getElementById('listaActiva');
    let listaInactiva = document.getElementById('listaInactiva');
    let botonCargar = document.getElementById('cargarDatos');
    let botonBajar = document.getElementById('bajar');
    let botonEliminar = document.getElementById('eliminar');
    let botonSubir = document.getElementById('subir');

    // Paso 3. Cargar datos en la lista de activos
    botonCargar.addEventListener('click', () => {

        listaActiva.innerHTML = ''; // Limpiar la lista antes de agregar los elementos para evitar duplicados

        nombres.forEach((nombre) => {
            let listItem = document.createElement('li');
            listItem.textContent = nombre;
            listItem.addEventListener('click', () => {
                listItem.classList.toggle('selected');
            });
            listaActiva.append(listItem);
        });

        botonCargar.disabled = true; // Deshabilitar el botón de cargar

        let mensaje = document.getElementById('mensaje1');
        mensaje.innerHTML = "Hacer click al nombre que quieras bajar"
        mensaje.classList.add('mensaje');
        mensaje.append(mensaje);

    });

    // Paso 4. Bajar nombres seleccionados a la lista de no activos
    botonBajar.addEventListener('click', () => {

        let seleccionados = listaActiva.querySelectorAll('.selected');
        seleccionados.forEach((item) => {
            listaInactiva.appendChild(item);
            item.classList.remove('selected');
        });

        let mensaje = document.getElementById('mensaje2');
        mensaje.innerHTML = "Hacer click al nombre que quieras subir y/o eliminar"
        mensaje.classList.add('mensaje');
        mensaje.append(mensaje);

    });

    // Paso 5. Eliminar nombres seleccionados de la lista de no activos
    botonEliminar.addEventListener('click', () => {

        let seleccionados = listaInactiva.querySelectorAll('.selected');
        seleccionados.forEach((item) => {
            item.remove(); // Eliminar el elemento del DOM
        });
    });

    // Paso 6. Subir nombres seleccionados a la lista de activos
    botonSubir.addEventListener('click', () => {
        
        let seleccionados = listaInactiva.querySelectorAll('.selected');
        seleccionados.forEach((item) => {
            listaActiva.appendChild(item);
            item.classList.remove('selected');
        });
    });

});
