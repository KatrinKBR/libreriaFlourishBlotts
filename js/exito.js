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

const mostrarPedidoExito = () => {
    for (libro of carrito) {
        let libroDelPedidoDom = domResumenPedidoExito(libro)
        $('#contentExito').append(libroDelPedidoDom)
    }
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

mostrarPedidoExito()