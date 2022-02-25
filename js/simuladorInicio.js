// Llamadas cuando document.ready
$(() => {
    $("#carritoVacio").show()

    cargarCarritoAlRefresco()

    initLibrosDisponibles()
        .then(mostrarLibrosDisponibles)
})