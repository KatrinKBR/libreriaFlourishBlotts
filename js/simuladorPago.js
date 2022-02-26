/**
 *  Script que se utiliza en realizarPago.html
 *  Tiene la logica de mostrar los libros en el resumen del pedido y la redireccion a la pantalla de 
 *  exito al hacer click en el boton "Realizar pago"
 */

// Funcion que muestra los libros que forman parte del resumen del pedido
const mostrarPedido = () => {
    for (libro of carrito) {
        let libroDelPedidoDom = domResumenPedido(libro)
        $('#contentResumen').append(libroDelPedidoDom)
    }
    actualizarTotalCarrito()
}

// Funcion que devuelve la estructura del DOM para libros del pedido
const domResumenPedido = (libro) => {
    let librosDelPedido = $(`<div class="row my-4" id="libroPedido${libro.id}">
                                <div class="col-5 justify-content-center">
                                    <img src="${libro.portada}" class="portadaCarrito mx-auto d-block">
                                </div>
                                <div class="col-5 align-self-center">
                                    <label class="fw-bold">${libro.titulo}</label>
                                    <label class="d-block">Precio: $${libro.precio}</label>
                                    <p id="carritoCantidad${libro.id}">Cantidad: ${libro.cantidad}</p> 
                                </div>
                            </div>`)
    return librosDelPedido
}

// Evento click en el boton "Realizar pago"
$("#btnPagar").click(() => {
    location.href = 'pantallaExito.html'
})  

// Llamada a la funcion
mostrarPedido()
