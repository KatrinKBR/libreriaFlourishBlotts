class Libro {
    constructor(id,isbn,titulo,autor,editorial,precio,portada,stock) {
        this.id = id
        this.isbn = isbn
        this.titulo = titulo
        this.autor = autor
        this.editorial = editorial
        this.precio = precio
        this.portada = portada
        this.stock = stock
    }
    
    /* mostrarDatos() {
        let datos = document.createElement("div")
        datos.innerHTML = `<p>ISBN: ${this.isbn}</p><p>titulo: ${this.titulo}</p><p>Autor: ${this.autor}</p>
                            <p>Editorial: ${this.editorial}</p><p>Precio: ${this.precio}</p><p>En stock: ${this.stock}</p>`
        document.body.appendChild(datos)
    } */

    venderEjemplar(cantidad) {
        this.stock = this.stock - cantidad
    }

    restockEjemplar(cantidad) {
        this.stock = this.stock + cantidad
    }
}
