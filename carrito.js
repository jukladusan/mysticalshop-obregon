
const menus = [
    { nombre: "inicio", url: "index.html" },
    { nombre: "contacto", url: "contacto.html" },
];


function cargarmenu() {
    let enlaces = document.getElementById("ulmenu");
    for (const menu of menus) {
        let lista = document.createElement("li");
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`;
        enlaces.appendChild(lista);
    }
}

cargarmenu();


let productocarritos = JSON.parse(localStorage.getItem("carrito")) || [];


function cargarCarrito() {
    let enlaces = document.getElementById("tablacarrito");
    enlaces.innerHTML = ""; 

    if (productocarritos.length > 0) {

        let productosAgrupados = {};

        productocarritos.forEach(producto => {
            producto.cantidad = parseInt(producto.cantidad, 10);
            if (productosAgrupados[producto.id]) {
                productosAgrupados[producto.id].cantidad += producto.cantidad;
            } else {
                productosAgrupados[producto.id] = { ...producto };
            }
        });

        for (const id in productosAgrupados) {
            let producto = productosAgrupados[id];
            let lista = document.createElement("tr");
            lista.id = producto.id;
            lista.innerHTML = `
                <td><img src="${producto.img}" alt="" width="50"></td>
                <td>${producto.cantidad}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td>$ ${(producto.cantidad * producto.precio).toFixed(2)}</td>
                <td><button id="btneliminar" onclick="eliminarProducto('${producto.id}')">Eliminar</button></td>
            `;
            enlaces.appendChild(lista);
        }


        let total = 0;
        let cantidadTotal = 0;

        for (const id in productosAgrupados) {
            let producto = productosAgrupados[id];
            total += producto.cantidad * producto.precio;
            cantidadTotal += producto.cantidad;
        }

        localStorage.setItem("cantidadCarrito", cantidadTotal);


        let totalFila = document.createElement("tr");
        totalFila.innerHTML = `
            <td colspan="5" style="text-align: right;">Total Final: $${total.toFixed(2)}</td>
            <td><button onclick="finalizarCompra()">Finalizar Compra</button></td>
        `;
        enlaces.appendChild(totalFila);

        actualizarCarrito(cantidadTotal);
    } else {

        let mensaje = document.createElement("tr");
        mensaje.innerHTML = "<td colspan='6'>No hay productos en el carrito</td>";
        enlaces.appendChild(mensaje);

        actualizarCarrito(0); 
    }
}

cargarCarrito();


function eliminarProducto(id) {
    productocarritos = productocarritos.filter(producto => producto.id !== id); 
    localStorage.setItem("carrito", JSON.stringify(productocarritos)); 
    localStorage.setItem("cantidadCarrito", JSON.stringify(0));

    cargarCarrito(); 
}


function finalizarCompra() {
    alert("Procediendo con la compra.");
}


function actualizarCarrito(cantidadTotal) {
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal || 0;
    }
}
