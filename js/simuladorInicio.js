/**
 *  Script que se utiliza en index.html
 *  Hace las llamadas a las funciones necesarias para el funcionamiento del index.html
 *  cuando el documento esta listo.
 */

// Llamadas a funciones cuando document.ready
$(() => {
    initLibrosDisponibles()
        .then(mostrarLibrosDisponibles)
        .then(mostrarAutoresFiltro)
        .then(mostrarEditorialesFiltro)
        .then(cargarCarritoAlRefresco)
})