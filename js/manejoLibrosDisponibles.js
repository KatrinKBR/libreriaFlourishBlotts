// Funcion que devuelve la estructura del DOM para libros disponibles
const domLibrosDisponibles = (libro) => {
    let seccionLibros = $(`<div class="col-lg-3 my-4">
                                    <img src="${libro.portada}">
                                    <span class="d-block fs-5 fw-bold my-2">${libro.titulo}</span>
                                    <span class="d-block">${libro.autor}</span>
                                    <span class="d-block my-2">$${libro.precio}</span>
                                    <button id="btnAgregar${libro.id}" class="btn btn-primary" onClick="agregarLibro(this.id)">Agregar</button>
                                </div>`)
    return seccionLibros
}

// Funcion que muestra los libros disponibles en el DOM
const mostrarLibrosDisponibles = () => {
    for (libro of librosDisponibles) {
        // Solo se muestran los libros con stock
        if (libro.stock != 0) {
            let seccionLibros = domLibrosDisponibles(libro)
            $('#content').append(seccionLibros)
        }
    }
}

// Funcion que se llama al hacer click en el boton de buscar libro
const buscarLibro = () => {
    // Vacia el html del content y obtiene el valor del input
    $('#content').html("")
    const valorInput = $("#inputBuscar").val().toLowerCase()

    // Si esta vacio, vuelve a mostrar todos los libros
    if (valorInput == "") {
        mostrarLibrosDisponibles()
    } else {
        // Sino, realiza el filtro en base al titulo ingresado por el usuario
        const resultado = librosDisponibles.filter(libro => libro.titulo.toLowerCase().includes(valorInput) && libro.stock != 0)
        // Muestra el DOM para todos los resultados
        for (libro of resultado) {
            let seccionLibros = domLibrosDisponibles(libro)
            $('#content').append(seccionLibros)
        }
    }
}

$("#btnBuscar").click(() => {
    buscarLibro()
})