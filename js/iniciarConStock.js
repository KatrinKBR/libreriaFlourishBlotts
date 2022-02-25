let librosDisponibles = []

//Funcion que simula una llamada con fetch para obtener los datos desde un .json 
const obtenerStock = async () => {
    const response = await fetch("stock.json")
        .then(res => res.json())
    return response
}
// Funcion que inicializa los libros disponibles en base a la respuesta a la llamada
const initLibrosDisponibles = async () => {
    librosDisponibles = await obtenerStock();
}