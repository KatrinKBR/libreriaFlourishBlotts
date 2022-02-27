# Librería Flourish & Blotts
Simulador de una librería e-commerce.

## Funcionalidades
### 1) Mostrar libros disponibles
Obtiene desde el stock.json los libros disponibles. Sólo mostrará los libros cuyo atributo "stock" es mayor a cero.

### 2) Buscar por título
Mostrará todos los libros cuyo título coincida desde parcial a totalmente con lo ingresado en el input de búsqueda.

### 3) Filtros
Permite filtrar por Autor, Editorial y rango de precios, seleccionando los checkbox correspondientes.

Notas a considerar: 
1) Si se escogen **solamente autores _O_ solamente editoriales**, mostrará el conjunto de libros de los autores o de las editoriales.
Ej: Si se escogen tres autores, se mostrarán todos los libros de esos autores. Si se escogen tres editoriales, se mostrarán todos los libros de esas editoriales.
2) Si se escogen filtros **_TANTO_ de autores _COMO_ de editoriales** (al mismo tiempo), se mostrarán los resultados de los libros con esos autores
**Y** con esas editoriales, por lo que podría no encontrarse un resultado si los autores seleccionados no tienen libros asociados a esas editoriales.
3) Lo mismo del punto anterior se aplica para el rango de precios, podrían no encontrarse resultados de autores y/o editoriales que tengan libros en ese rango de precios.
3) Si no se selecciona ningún filtro, el botón "Filtrar" no realiza ninguna acción.

### 4) Carrito de compras
Se permite añadir al carrito de compras el libro que el usuario desea a través de su botón "Agregar" correspondiente.

Notas a considerar:
1) Al hacer click al botón "Agregar", añade de uno en uno al carrito.
2) Se verifica que el usuario no pueda añadir más libros al carrito de los disponbiles en stock, deshabilitando el botón de "Agregar" cuando se tiene en carrito la misma cantidad que en stock.
3) Si el carrito está vacío, el botón "Pagar" está deshabilitado.
4) El carrito se mantiene incluso al recagar el sitio web.

## Flujo
### 1) Pantalla de inicio
En la pantalla de inicio se realiza toda la lógica de buscar, aplicar filtros y manejar el carrito. Cuando se hace click en el botón pagar, se redireccionará a la pantalla de pago.

### 2) Pantalla de pago
Se hizo una simulación de pantalla de pago, donde se muestra el resumen del pedido y se piden los datos que generalmente se solicitan para finalizar
una compra en un e-commerce. 

Notas a considerar: 
1) Debido a que es una simulación de un flujo de compra, no se hace ninguna verificación de los campos del formulario, para poder avanzar sin problemas a la siguiente pantalla.

### 3) Pantalla de éxito
Se hizo una simulación de compra exitosa, donde se muestra el número de orden de compra, los productos seleccionados y una línea que muestra paso por paso
el flujo de la compra. 

Notas a considerar:
1) Se vacía el carrito de compras al llegar a esta pantalla.
