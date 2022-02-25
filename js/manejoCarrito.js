let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// Funcion que se llama al hacer click en el boton agregar
const agregarLibro = (elemId) => {
    let id = parseInt(elemId.replace("btnAgregar", ""))

    // Verificamos si el libro ya esta en el carrito
    let libroExistente = carrito.find(libro => libro.id == id)

    // Si existe
    if (libroExistente != null) {
        // Añadimos +1 la ya existente en el carrito
        libroExistente.cantidad += 1

        // Actualizamos el DOM
        $(`#carritoCantidad${id}`).html(`<p id="carritoCantidad${id}">Cantidad: ${libroExistente.cantidad}</p>`)
        // Mostrar el toaster
        mostrarToasterCarrito(libroExistente)
        // Si se esta agregando por primera vez
    } else {
        // Obtenemos el libro a añadir
        let libroNuevo = librosDisponibles.find(libro => libro.id == id)

        // Le asignamos una nueva propiedad al objeto para cantidad
        libroNuevo["cantidad"] = 1

        // Se guarda en el arreglo de carrito
        carrito.push(libroNuevo)

        // Se agrega al dom la info del nuevo libro
        let libroNuevoDom = domLibrosEnCarrito(libroNuevo)
        $('#contentCarrito').append(libroNuevoDom)

        // Mostrar el toaster
        mostrarToasterCarrito(libroNuevo)

        // Ocultamos el mensaje de no hay articulos y mostramos el total
        $("#carritoVacio").hide()
        $("#totalCompraMsj").show()

        // Activamos el boton pagar
        btnPagar.disabled = false;
    }

    // Guarda el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito))

    // Actualiza el total del carrito
    actualizarTotalCarrito()
    // Actualiza el numero con la cantidad de libros en el carrito
    actualizarCantidadCarrito()
}

// Funcion que se llama al hacer click en el boton eliminar
const eliminarLibro = (elemId) => {
    let id = parseInt(elemId.replace("btnEliminar", ""))

    // Quitamos los elementos del DOM
    $(`#elementoCarrito${id}`).remove();
    // Eliminamos el elemento de carrito
    carrito = carrito.filter(libro => libro.id !== id)

    // Vuelve a guardar el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito))

    // Si el carrito quedo vacio, mostramos el mensaje de no hay articulos
    // y se desactiva el boton de pagar
    if (carrito.length === 0) {
        $("#carritoVacio").show()
        btnPagar.disabled = true;
    }

    // Actualiza el total del carrito
    actualizarTotalCarrito()
    // Actualiza el numero con la cantidad de libros en el carrito
    actualizarCantidadCarrito()
}

// Funcion para hacer el calculo del monto total del carrito
const calcularMontoTotalCarrito = () => {
    let calculoTotal = 0
    for (libro of carrito) {
        calculoTotal += libro.precio*libro.cantidad
    }
    return calculoTotal
}

// Funcion para actualizar la cantidad de elementos en el carrito
const actualizarCantidadCarrito = () => {
    let cantidadTotal = 0
    // Cuenta el total de elementos en el carrito revisando la cantidad de c/u
    for (libro of carrito) {
        cantidadTotal += parseInt(libro.cantidad)
    }
    // Si el carrito quedo vacio, se esconde el elemento donde se muestra la cuenta,
    // sino se hace visible
    if (cantidadTotal == 0) {
        $('#cuentaCarrito').hide()
    } else {
        $('#cuentaCarrito').show()
    }

    // Se actualiza en el elemento html la cantidad de libros
    $('#cuentaCarrito').html(cantidadTotal)
}

// Funcion para actualizar el total de la compra
const actualizarTotalCarrito = () => {
    $("#totalCompra").html(calcularMontoTotalCarrito())
}

// Funcion que permite mantener el carrito al refrescar el sitio
const cargarCarritoAlRefresco = () => {
    // Si el carrito no esta vacio, mostramos los elementos guardados en el storage
    if (carrito.length != 0) {
        for (libro of carrito) {
            let libroCarritoDom = domLibrosEnCarrito(libro)
            $('#contentCarrito').append(libroCarritoDom)
        }

        // Se esconde el mensaje de vacio
        $("#carritoVacio").hide()

        // Se activa el boton de pago
        btnPagar.disabled = false;

        // Se actualiza el total y la cantidad
        actualizarTotalCarrito()
        actualizarCantidadCarrito()
    }
}

const mostrarToasterCarrito = (libro) => {
    $("#toastContent").html(`<div class="fs-6 fw-bold">${libro.titulo}</div> <div>$${libro.precio}</div>`)
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

const realizarPago = () => {
    if (carrito.length != 0)
        location.href = 'realizarPago.html'
}

// Funcion que devuelve la estructura del DOM para libros en carrito
const domLibrosEnCarrito = (libro) => {
    let nuevoLibro = $(`<div class="row my-4" id="elementoCarrito${libro.id}">
                                <div class="col-5 justify-content-center">
                                    <img src="${libro.portada}" class="portadaCarrito mx-auto d-block">
                                </div>
                                <div class="col-5 align-self-center">
                                    <label class="fw-bold">${libro.titulo}</label>
                                    <label>Precio: $${libro.precio}</label>
                                    <p id="carritoCantidad${libro.id}">Cantidad: ${libro.cantidad}</p> 
                                </div>
                                <div class="col-2 align-self-center">
                                    <img id="btnEliminar${libro.id}" class="btnEliminar" src="./assets/trash.png" alt="eliminar" onClick="eliminarLibro(this.id)">
                                </div>
                            </div>`)
    return nuevoLibro
}