let codigo = location.search;
let codigoProducto = new URLSearchParams(codigo);
let codigoSeleccionado = codigoProducto.get('codigo');
console.log(codigoSeleccionado);
let codigoFinal = document.getElementById('codigo');
codigoFinal.innerHTML += `Codigo del Producto: ${codigoSeleccionado}`;

let carritoCompra = JSON.parse(localStorage.getItem(`carrito`)) || []
console.log("carritoCompra: ",carritoCompra);
const contenedorProductos = document.getElementById("contenedorCarrito")


fetch('../datos/productos.json')
  .then((respuesta) => {
    return respuesta.json()
  })
  .then((productos) => {
    console.log(productos)
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].Codigo == codigoSeleccionado) {
        const sectionDetalle = document.querySelector(".detalle")
        sectionDetalle.innerHTML += `
                <article class="producto container">
                  <div class="row align-items-start">
                     <div class="col">
                       <img class="w-50 p-3" src="${productos[i].img}" alt="${productos[i].Nombre}">
                       <h2 class="fw-bold">Nombre: ${productos[i].Nombre}</h2>
                       <h3>Género: ${productos[i].Género}</h3>
                       <h3>Clasificación: ${productos[i].Clasificación}</h3>
                       <h3>Puntuación: ${productos[i].Puntuación}</h3>
                       <h4>Descripción: ${productos[i].Descripción}</h4>
                       <h3 class"fw-bold">Precio: ${productos[i].Precio}</h3>
                     </div>
                     <div class="col">
                       <iframe width="560" height="315" src="${productos[i].Video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                       <button class="btn btn-outline-info" id="agregarCarrito">Agregar al carrito</button>
                     </div>
                  </div>
                </article>
                `
                const agregarAlCarrito = document.getElementById("agregarCarrito")
                agregarAlCarrito.addEventListener("click", (event) => { 
                  const nuevaCompra = {
                    nombre: productos[i].Nombre,
                    img: productos[i].img,
                    cantidad: 1,
                    precio:productos[i].Precio,
                  }
                  carritoCompra.push(nuevaCompra)
                  console.log("carritoCompra: ",carritoCompra);
                  localStorage.setItem(`carrito`, JSON.stringify(carritoCompra))
                })
      }
    }
  })



  .catch((error) => {
    console.log('Ufff ha ocurrido un error ' + error);
  })
