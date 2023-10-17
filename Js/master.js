let productosHTML = document.querySelector('.productos');
console.log(productosHTML);
fetch('../datos/productos.json')
    .then((respuesta) => {
        return respuesta.json()
    })
    .then((productos) => {
        productos.forEach(producto => {
            if (productosHTML) {
                productosHTML.innerHTML += `
        <article class="producto text-center col-12 col-md-6 col-lg-4">
          <img class="w 50" src="${producto.img}" alt="${producto.Nombre}">
          <h2>Nombre: ${producto.Nombre}</h2>
          <h3>Precio: ${producto.Precio}</h3>
          <a class="btn btn-outline-info d-block" href="detalle.html?codigo=${producto.Codigo}">Ver detalle </a>
        </article>
        `
            }
        });
    })
    .catch((error) => {
        console.log('Ufff ha ocurrido un error ' + error)
    })