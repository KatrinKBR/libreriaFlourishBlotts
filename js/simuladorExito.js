/**
 *  Script que se utiliza en pantallaExito.html
 *  Tiene la logica de mostrar los libros que son parte del pedido y vaciar el carrito de compras.
 */

// Funcion que permite mostrar los libros que son parte del pedido
 const mostrarPedidoExito = () => {
    for (libro of carrito) {
        let libroDelPedidoDom = domResumenPedidoExito(libro)
        $('#contentExito').append(libroDelPedidoDom)
    }

    // Se vacia el carrito
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Funcion que devuelve la estructura del DOM para libros del pedido
const domResumenPedidoExito = (libro) => {
    let librosDelPedido = $(`<div class="col-3 my-3 bordes">
                                <div class="row my-4" id="libroPedido${libro.id}">
                                    <div class="col-5">
                                        <img src="${libro.portada}" class="portadaCarrito mx-auto d-block">
                                    </div>
                                    <div class="col-5 align-self-center">
                                        <label class="fw-bold">${libro.titulo}</label>
                                        <label class="d-block">Precio: $${libro.precio}</label>
                                        <p id="carritoCantidad${libro.id}">Cantidad: ${libro.cantidad}</p> 
                                    </div>
                                </div>
                            </div>`)
    return librosDelPedido
}

// Llamada a la funcion
mostrarPedidoExito()