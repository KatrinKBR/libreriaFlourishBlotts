/**
 *  Script que se utiliza en el idex.html
 *  Contiene toda la logica relacionada mostrar los libros disponibles y los filtros disponibles.
 */

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

// Funcion que muestra los autores para usar como filtros
const mostrarAutoresFiltro = () => {
    let autoresDisponibles = obtenerAutores()
    for(autor of autoresDisponibles) {
        let autoresDisponiblesDom = domFiltrar(autor)
        $('#listaAutores').append(autoresDisponiblesDom)
    }
}

// Funcion que muestra las editoriales para usar como filtros
const mostrarEditorialesFiltro = () => {
    let editorialesDisponibles = obtenerEditoriales()
    for(editorial of editorialesDisponibles) {
        let editorialesDisponibles = domFiltrar(editorial)
        $('#listaEditoriales').append(editorialesDisponibles)
    }
}

// Funcion que obtiene todos los autores de los libros disponibles
const obtenerAutores = () => {
    let autores = []
    for (libro of librosDisponibles) {
        if (!autores.some(autor => libro.autor == autor)) {
            autores.push(libro.autor)
        }
    }
    // Ordena los autores alfabeticamente
    autores.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
    return autores
}

// Funcion que obtiene todas las editoriales de los libros disponibles
const obtenerEditoriales = () => {
    let editoriales = []
    for (libro of librosDisponibles) {
        if (!editoriales.some(editorial => libro.editorial == editorial)) {
            editoriales.push(libro.editorial)
        }
    }
    // Ordena las editoriales alfabeticamente
    editoriales.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
    return editoriales
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

// Funcion que se llama al hacer click en el boton aplicar filtros
const aplicarFiltros = (filtrosSeleccionados) => {
    // Vacia el html del content
    $('#content').html("")
    let resultado = []

    // Se usan dos testigos para determinar si se selecciono autor y/o editorial como filtro
    let testigoAutor = false
    let testigoEditorial = false

    // Se recorren los filtros seleccionados por el usuario
    JSON.parse(filtrosSeleccionados).map((element) => {
        // Si el tipo de filtro corresponde a autores
        if(element.tipoFiltro == 'listaAutores') {
            // Se va almacenando en el resultado los autores seleccionados y se activa el testigo
            resultado = resultado.concat(librosDisponibles.filter(libro => libro.autor == element.filtro))
            testigoAutor = true
        // Si el tipo de filtro corresponde a editoriales
        } else if(element.tipoFiltro == 'listaEditoriales') {
            // Si no se selecciono un autor, se va almacenando en el resultado las editoriales seleccionadas
            if (!testigoAutor) {
                resultado = resultado.concat(librosDisponibles.filter(libro => libro.editorial == element.filtro))
            } else {
            // Si ya el resultado venia filtrado por autor, se aplica el filtrado por editorial sobre ese resultado
            // ya filtrado
                resultado = resultado.filter(libro => libro.editorial == element.filtro)
            }
            // Se activa el testigo
            testigoEditorial = true
        // Si el tipo de filtro corresponde a rango de precios
        } else {
            // Se obtiene el minimo y el maximo enviado en el atributo filtro
            let minimo = element.filtro.split("-")[0]
            let maximo = element.filtro.split("-")[1]
            // Si maximo es undefined (que corresponde a $60000 o mas), se le asigna el maximo posible
            if(maximo == undefined) {
                maximo = 9999999
            }
            // Si no se activaron los filtros de autor y editorial
            if(!testigoAutor && !testigoEditorial) {
                // Se filtra por el rango de precios seleccionados
                resultado = librosDisponibles.filter(libro => libro.precio >= minimo && libro.precio <= maximo)
            // Si se activo alguno de los filtros de autor o editorial
            } else {
            // Se aplica el filtrado por rango de precios sobre ese resultado ya filtrado
                resultado = resultado.filter(libro => libro.precio >= minimo && libro.precio <= maximo)
            }
        }
    });
    // Si se obtuvo algun resultado, se muestran los libros que coinciden con los filtros
    if (resultado.length != 0) {
        for (libro of resultado) {
            if (libro.stock != 0) {
                let seccionLibros = domLibrosDisponibles(libro)
                $('#content').append(seccionLibros)
            }
        }
    // Sino se muestra un mensaje informando que no se encontraron libros 
    } else {
        let sinResultadoDom = domSinResultado()
        $('#content').append(sinResultadoDom)        
    }
}

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

// Funcion que devuelve la estructura del DOM para los filtros
const domFiltrar = (filtro) => {
    let filtroDisponibles = $(`<label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value='${filtro}' id=filtro${filtro}>
                                    ${filtro}
                                </label>`)
    return filtroDisponibles
}

// Funcion que devuelve la estructura del DOM para ningun libro que coincida con los filtros
const domSinResultado = () => {
    let sinResultado = $(`<div class="alert alert-warning my-4" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                No pudimos encontrar libros que coincidan con la selección.
                             </div>`)
    return sinResultado
}

// Evento click para el boton de aplicar filtros
$("#btnAplicarFiltros").click(() => {
    let filtros = [];
    // Filtra todos los checkbox que esten seleccionados 
    $('.form-check-input').filter(':checked').each(function() {
        // Guarda en el arreglo "filtros" un objeto con atributos tipoFiltro (Ej. listaAutores, listaEditoriales, listaRangoPrecios) 
        // y el filtro (Ej. Agatha Christie)
        filtros.push({"tipoFiltro": $(this).closest('.list-group').attr('id'), "filtro": $(this).attr('value')})    
    });

    // Si se selecciono algun filtro
    if(filtros.length != 0) {
        // Se le envia a la funcion aplicarFiltros el arreglo
        aplicarFiltros(JSON.stringify(filtros))
    }
})

// Evento click para limpiar filtros
$("#btnLimpiarFiltros").click(() => {
    // Quita la propiedad checked de todos los checkbox
    $('.form-check-input').each(function() {
        $(this).prop('checked',false)
    })

    // Vacia el html del content
    $('#content').html("")

    // Muestra todos los libros disponibles
    mostrarLibrosDisponibles()
})

// Evento click para el boton de buscar
$("#btnBuscar").click(() => {
    buscarLibro()
})