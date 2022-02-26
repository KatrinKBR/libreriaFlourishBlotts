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

const domFiltrar = (filtro) => {
    let filtroDisponibles = $(`<label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value='${filtro}' id=filtro${filtro}>
                                    ${filtro}
                                </label>`)
    return filtroDisponibles
}

const obtenerAutores = () => {
    let autores = []
    for (libro of librosDisponibles) {
        if (!autores.some(autor => libro.autor == autor)) {
            autores.push(libro.autor)
        }
    }

    autores.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
    return autores
}

const mostrarAutoresFiltro = () => {
        let autoresDisponibles = obtenerAutores()
        for(autor of autoresDisponibles) {
            let autoresDisponiblesDom = domFiltrar(autor)
            $('#listaAutores').append(autoresDisponiblesDom)
        }
}

const obtenerEditoriales = () => {
    let editoriales = []
    for (libro of librosDisponibles) {
        if (!editoriales.some(editorial => libro.editorial == editorial)) {
            editoriales.push(libro.editorial)
        }
    }
    editoriales.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
    return editoriales
}

const mostrarEditorialesFiltro = () => {
    let editorialesDisponibles = obtenerEditoriales()
    for(editorial of editorialesDisponibles) {
        let editorialesDisponibles = domFiltrar(editorial)
        $('#listaEditoriales').append(editorialesDisponibles)
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
        console.log(resultado)
        for (libro of resultado) {
            let seccionLibros = domLibrosDisponibles(libro)
            $('#content').append(seccionLibros)
        }
    }
}

const aplicarFiltros = (filtrosSeleccionados) => {
    $('#content').html("")
    let resultado = []

    JSON.parse(filtrosSeleccionados).map((element) => {
        if(element.tipoFiltro == 'listaAutores') {
            resultado = resultado.concat(librosDisponibles.filter(libro => libro.autor == element.filtro))
        }
        // if(element.tipoFiltro == 'listaEditoriales') {
        //     resultadoE = resultadoE.concat(librosDisponibles.filter(libro => libro.editorial == element.filtro))
        // }
    });
    console.log(resultado)
    if (resultado.length != 0) {
        for (libro of resultado) {
            let seccionLibros = domLibrosDisponibles(libro)
            $('#content').append(seccionLibros)
        }
    }
}

$("#btnAplicarFiltros").click(() => {
    let filtros = [];
    $('.form-check-input').filter(':checked').each(function() {
        filtros.push({"tipoFiltro": $(this).closest('.list-group').attr('id'), "filtro": $(this).attr('value')})    
    });
    aplicarFiltros(JSON.stringify(filtros))
})

$("#btnBuscar").click(() => {
    buscarLibro()
})

// $('#' + id).is(":checked")