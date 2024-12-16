
const menus = [
    {nombre: "inicio", url: "index.html"}, 
    {nombre: "contacto", url: "contacto.html"} 
];


function cargarmenu() {
    let enlaces = document.getElementById("ulmenu"); 
    if (!enlaces) {
        console.error("No se encontró el elemento con id 'ulmenu'");
        return;
    }
    for (const menu of menus) { 
        let lista = document.createElement("li"); 
        lista.innerHTML = `<a href="${menu.url}">${menu.nombre}</a>`; 
        enlaces.appendChild(lista); 
    }
}


const productos = [
    {nombre:"Almohadon", precio:"10000", img:"img/almohadon.jpeg", id:"1", stock:20},
    {nombre:"Bolso", precio:"30000", img:"img/bolso.jpeg", id:"2", stock:10},
    {nombre:"Ladrillos", precio:"5000", img:"img/ladrillos.jpeg", id:"3", stock:24},
    {nombre:"Mat premium", precio:"30000", img:"img/matpremium.jpeg", id:"4", stock:30},
    {nombre:"Mat simple", precio:"25000", img:"img/matsimple.jpeg", id:"5", stock:28},
    {nombre:"Pelota", precio:"15000", img:"img/pelota.jpeg", id:"6", stock:50},
]


function cargarproductos() {
    let ventas = document.getElementById("boxproductos"); 
    if (!ventas) {
        console.error("No se encontró el elemento con id 'boxproductos'");
        return;
    }
    for (const producto of productos) {
        let contenedor = document.createElement("div"); 
        contenedor.innerHTML = `
            <div id="boxproducto"> <!-- Caja del producto -->
                <h3>${producto.nombre}</h3> <!-- Nombre del producto -->
                <img src="${producto.img}" alt="${producto.nombre}"> <!-- Imagen del producto -->
                <p>$ ${producto.precio}</p> <!-- Precio del producto -->
                <button onclick="verdetalle('${producto.id}')">Detalle</button> <!-- Botón de detalles -->
            </div>`;
        ventas.appendChild(contenedor); 
    }
}


function verdetalle(idproducto) {
    const buscarproducto = productos.find(producto => producto.id === idproducto); 
    if (!buscarproducto) {
        console.error("Producto no encontrado");
        return;
    }
    const enJSON = JSON.stringify(buscarproducto);
    localStorage.setItem("detalleproducto", enJSON); 
    window.location.href = "detalle.html"; 
}


function actualizarCarrito() {
   
    let cantidadTotal = parseInt(localStorage.getItem("cantidadCarrito"), 10) || 0;

    
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal;
    }
}

window.addEventListener('DOMContentLoaded', function() {
    cargarmenu();
    cargarproductos();
    actualizarCarrito();
});
