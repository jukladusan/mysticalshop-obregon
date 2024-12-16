
const menus = [
    {nombre: "inicio", url: "index.html"}, 
    {nombre: "contacto", url: "contacto.html"},
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


let productodetalle = JSON.parse(localStorage.getItem("detalleproducto"));

function cargarproducto() {
    let enlaces = document.getElementById("boxproducto"); 
    let lista = document.createElement("div"); 
    lista.innerHTML = `
        <h3>${productodetalle.nombre}</h3><br> <!-- Nombre del producto -->
        <img src=${productodetalle.img} alt=""><br> <!-- Imagen del producto -->
        <p>$ ${productodetalle.precio}</p><br> <!-- Precio del producto -->
        <div class="botonescontador"><br> <!-- Contador de productos -->
            <button onclick="sumar()">+</button> <!-- Botón para sumar -->
            <p id="contarproducto">0</p> <!-- Contador inicial -->
            <button onclick="restar()">-</button> <!-- Botón para restar -->
        </div><br>
        <button onclick="cargarcarrito()">Agregar al carrito</button> <!-- Botón para agregar al carrito -->
    `;
    enlaces.appendChild(lista); 
}

cargarproducto();


let contador = 0;

function sumar() {
    let nstock = productodetalle.stock
    if (contador<nstock) {
        contador = contador + 1;
        document.getElementById("contarproducto").innerHTML = contador;
    } else {
        alert("Stock máximo de producto")
    }
}

function restar() {
    if (contador > 0) { 
        contador = contador - 1;
        document.getElementById("contarproducto").innerHTML = contador; 
    }
}

function cargarcarrito() {
    if (contador === 0) { 
        alert("Por favor, ingrese la cantidad de productos deseados");
    } else {
        let carrito = JSON.parse(localStorage.getItem("carrito")); 

        if (carrito === null) {
            carrito = []; 
        }


        cantidadproducto = parseInt(document.getElementById("contarproducto").innerHTML);
        productonuevo = {
            id: productodetalle.id,
            nombre: productodetalle.nombre,
            cantidad: cantidadproducto, 
            precio: productodetalle.precio, 
            img: productodetalle.img 
        };

        carrito.push(productonuevo); 
        const enJSON = JSON.stringify(carrito); 
        localStorage.setItem("carrito", enJSON); 
        window.location.href = "carrito.html"; 
    }
}



function actualizarCarrito() {
    // Recuperar la cantidad desde localStorage
    let cantidadTotal = parseInt(localStorage.getItem("cantidadCarrito"), 10) || 0;

    // Actualizar el contador en el ícono del carrito
    const cantidadCarritoElement = document.getElementById("cantidad-carrito");
    if (cantidadCarritoElement) {
        cantidadCarritoElement.textContent = cantidadTotal;
    }
}

window.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
});
