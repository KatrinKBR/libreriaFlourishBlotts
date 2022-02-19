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

// Funcion que muestra los libros disponibles en el DOM
const mostrarLibrosDisponibles = () => {
    for (libro of librosDisponibles) {
        let seccionLibros = $(`<div>
                                    <img src="${libro.portada}">
                                    <h3>${libro.titulo}</h3>
                                    <p>${libro.autor}</p>
                                    <p>$${libro.precio}</p>
                                    <label for="cantidad${libro.id}">Cantidad</label>
                                    <input type="number" id="cantidad${libro.id}" min="5" max="5">
                                    <button id="btnAgregar${libro.id}" class="btnAgregar">Agregar</button>
                                </div>`)
        $('#contentFlex').append(seccionLibros)
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
    }
    // Guarda el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito))

    // Actualiza el total del carrito
    actualizarTotalCarrito()
    // Actualiza el numero con la cantidad de libros en el carrito
    actualizarCantidadCarrito()

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
    carritoLocal = JSON.parse(localStorage.getItem("carrito"))

    //Quitamos el libro del carrito
    carritoLocal.splice(carritoLocal.findIndex(libro => libro.id == id), 1)

    // Mantenemos carrito igual que el carrito de local
    carrito = carritoLocal

    // Vuelve a guardar el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito))

    // Actualiza el total del carrito
    actualizarTotalCarrito()
    // Actualiza el numero con la cantidad de libros en el carrito
    actualizarCantidadCarrito()
}

const calcularMontoTotalCarrito = () => {
    let calculoTotal = 0
    for (libro of carrito) {
        calculoTotal += multiplicarValores(libro.precio, libro.stock)
    }
    return calculoTotal
}

const actualizarCantidadCarrito = () => {
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

const actualizarTotalCarrito = () => {
    $("#totalCompra").html(calcularMontoTotalCarrito())
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

// Llamado a las funciones
initLibrosDisponibles()
    .then(mostrarLibrosDisponibles)
    .then(agregarBtnAgregarListeners)




