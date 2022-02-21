let carrito = []
let stockURL = "stock.json"
let librosDisponibles =  []

//Funcion que simula una llamada para obtener los datos desde un .json
const obtenerStock = async () => {
    const response = await fetch(stockURL)
                            .then(res => res.json())
    return response
}
// Funcion que inicializa los libros disponibles en base a la respuesta a la llamada
const initLibrosDisponibles = async () =>{
    librosDisponibles = await obtenerStock();
}

// Funcion que devuelve la estructura del DOM para libros disponibles
const domLibrosDisponibles = (libro) => {
    let seccionLibros = $(`<div class="col-3 my-4">
                                    <img src="${libro.portada}">
                                    <p class="fs-5 my-3">${libro.titulo}</h5>
                                    <p>${libro.autor}</p>
                                    <p>$${libro.precio}</p>
                                    <label for="cantidad${libro.id}">Cantidad</label>
                                    <input type="number" id="cantidad${libro.id}" min="5" max="5">
                                    <button id="btnAgregar${libro.id}" class="btn btn-primary">Agregar</button>
                                </div>`)
    return seccionLibros
}

// Funcion que muestra los libros disponibles en el DOM
const mostrarLibrosDisponibles = () => {
    for (libro of librosDisponibles) {
        let seccionLibros = domLibrosDisponibles(libro)
        $('#content').append(seccionLibros)
    }
}

// Funcion que se llama al hacer click en el boton agregar
const agregarLibro = (id) => {
    // Verificamos si el libro ya esta en el carrito
    let libroExistente = carrito.find(libro => libro.id == id)

    // Si existe
    if (libroExistente != null) {
        // Obtenemos la cantidad ingresada por el usuario
        const cantidad = parseInt($(`#cantidad${id}`).val())

        // Añadimos la cantidad seleccionada a la ya existente en el carrito
        libroExistente.stock = parseInt(libroExistente.stock) + cantidad

        // Actualizamos el DOM
        $(`#carritoCantidad${id}`).html(`<p id="carritoCantidad${id}">Cantidad: ${libroExistente.stock}</p>`)
    // Si se esta agregando por primera vez
    } else {
        // Obtenemos el libro añadir
        let libroNuevo = librosDisponibles.find(libro => libro.id == id)

        // Obtenemos la cantidad ingresada por el usuario
        const cantidad = parseInt($(`#cantidad${id}`).val())

        // Le asignamos la cantidad
        // Nota: Estamos reutilizando el campo de stock como la cantidad de los ejemplares en el carrito
        libroNuevo.stock = cantidad

        // Se guarda en el arreglo de carrito
        carrito.push(libroNuevo)

        let nuevoLibro = $(`<div class="elementosCarrito" id="elementoCarrito${id}">
                                <p>${libroNuevo.titulo}</p>
                                <p>Precio: $${libroNuevo.precio}</p>
                                <p id="carritoCantidad${id}">Cantidad: ${cantidad}</p> 
                                <img id="btnEliminar${id}" class="btnEliminar" src="../assets/trash.png" alt="trash">
                            </div>`)
        $('#contentCarrito').append(nuevoLibro)

        // Ocultamos el mensaje de no hay articulos y mostramos el total
        $("#carritoVacio").hide()
        $("#totalCompraMsj").show()
    }
    // Guarda el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito))

    // Actualiza el total del carrito
    actualizarTotalCarrito(carrito)
    // Actualiza el numero con la cantidad de libros en el carrito
    actualizarCantidadCarrito(carrito)

    // Agrega el evento click a los botones de eliminar
    agregarBtnEliminarListeners()

    // Vacia el input de cantidad
    $(`#cantidad${id}`).val("")
}

// Funcion que se llama al hacer click en el boton eliminar
const eliminarLibro = (id) => {
    // Quitamos los elementos del DOM
   $(`#elementoCarrito${id}`).remove();

    // Obtenemos el carrito guardado en el localStorage
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"))

    //Quitamos el libro del carrito
    carritoLocal.splice(carritoLocal.findIndex(libro => libro.id == id), 1)

    // Mantenemos carrito igual que el carrito de local
    carrito = carritoLocal

    // Vuelve a guardar el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito))

    // Si el carrito quedo vacio, mostramos el mensaje de no hay articulos y ocultamos el total
    if (carrito.length == 0) {
        $("#carritoVacio").show()
        $("#totalCompraMsj").hide()
    }

    // Actualiza el total del carrito
    actualizarTotalCarrito(carrito)
    // Actualiza el numero con la cantidad de libros en el carrito
    actualizarCantidadCarrito(carrito)
}

// Funcion que se llama al hacer click en el boton de buscar libro
const buscarLibro = () => {
    $('#content').html("")
    const valorInput = $("#inputBuscar").val().toLowerCase()
    if(valorInput == "") {
        mostrarLibrosDisponibles()
    } else {
        const resultado = librosDisponibles.filter(libro => libro.titulo.toLowerCase().includes(valorInput))
        for (libro of resultado) {
            console.log(libro.titulo.toLowerCase())
            let seccionLibros = domLibrosDisponibles(libro)
            $('#content').append(seccionLibros)
        }
    }
}

// Funcion para hacer el calculo del monto total del carrito
const calcularMontoTotalCarrito = (carrito) => {
    let calculoTotal = 0
    for (libro of carrito) {
        calculoTotal += multiplicarValores(libro.precio, libro.stock)
    }
    return calculoTotal
}

// Funcion para actualizar la cantidad de elementos en el carrito
const actualizarCantidadCarrito = (carrito) => {
    let cantidadTotal = 0
    // Cuenta el total de elementos en el carrito revisando el stock de c/u
    for (libro of carrito) {
        cantidadTotal += parseInt(libro.stock)
    }
    // Si el carrito quedo vacio, se esconde el elemento donde se muestra la cuenta,
    // sino se hace visible
    if (cantidadTotal == 0) {
        $('#cuentaCarrito').css("visibility", "hidden")
    } else {
        $('#cuentaCarrito').css("visibility", "visible")
    }

    // Se actualiza en el elemento html la cantidad de libros
    $('#cuentaCarrito').html(cantidadTotal)
}

// Funcion para actualizar el total de la compra
const actualizarTotalCarrito = (carrito) => {
    $("#totalCompra").html(calcularMontoTotalCarrito(carrito))
}

// Funcion que permite mantener el carrito al refrescar el sitio
const cargarCarritoAlRefresco = () => {
    // Obtiene el carrito del storage
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"))

    // Se le asigna al carrito
    carrito = carritoLocal

    // Si el carrito no esta vacio, mostramos los elementos guardados en el storage
    if (carritoLocal.length != 0){
        for(elemento of carritoLocal){
            let elementoCarrito = $(`<div class="elementosCarrito" id="elementoCarrito${elemento.id}">
                                <p>${elemento.titulo}</p>
                                <p>Precio: $${elemento.precio}</p>
                                <p id="carritoCantidad${elemento.id}">Cantidad: ${elemento.stock}</p> 
                                <img id="btnEliminar${elemento.id}" class="btnEliminar" src="../assets/trash.png" alt="trash">
                            </div>`)
            $('#contentCarrito').append(elementoCarrito)
        }

        // Se esconde el mensaje de vacio y se muestra el total
        $("#carritoVacio").hide()
        $("#totalCompraMsj").show()

        // Se actualiza el total y la cantidad
        actualizarTotalCarrito(carritoLocal)
        actualizarCantidadCarrito(carritoLocal)

        // Se agrega el evento click para los botones
        agregarBtnEliminarListeners()

    }
}

const multiplicarValores = (precio,cantidad) => {
    return precio*cantidad
}

// Funcion que agrega los eventos listeners en los botones de agregar
const agregarBtnAgregarListeners = () => {
    for (let i=1; i < librosDisponibles.length + 1; i++) {
        $(`#btnAgregar${i}`).click(() => {
            agregarLibro(i)
        })
    }
}

// Funcion que agrega los eventos listeners en los botones de eliminar
const agregarBtnEliminarListeners = () => {
    for (let i=1; i < carrito.length + 1; i++) {
        // Listeners para los botones de eliminar
        $(`#btnEliminar${i}`).click(() => {
            eliminarLibro(i)
        })
    }
}

$("#btnBuscar").click(() => {
    buscarLibro()
})

$(()=>{
    $("#carritoVacio").show()
    cargarCarritoAlRefresco()

    initLibrosDisponibles()
    .then(mostrarLibrosDisponibles)
    .then(agregarBtnAgregarListeners)
})


