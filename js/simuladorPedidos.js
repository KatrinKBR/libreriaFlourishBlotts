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

const mostrarPedido = () => {
    for (libro of carrito) {
        let libroDelPedidoDom = domResumenPedido(libro)
        $('#contentResumen').append(libroDelPedidoDom)
    }
}

const pantallaExito = () => {
    location.href = 'pantallaExito.html'
}

mostrarPedido()
