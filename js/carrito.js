/*=====================================================
        CARRITO DE COMPRAS — URACHOCOLATES
        Módulo compartido en todas las páginas
        Persistencia con localStorage
======================================================*/

const CART_KEY = "ura_carrito";

/*======================================
        LEER / GUARDAR CARRITO
=======================================*/

function obtenerCarrito(){

    const data = localStorage.getItem(CART_KEY);

    return data ? JSON.parse(data) : [];

}

function guardarCarrito(carrito){

    localStorage.setItem(CART_KEY, JSON.stringify(carrito));

    actualizarBadge();

}

/*======================================
        AGREGAR PRODUCTO
=======================================*/

function agregarAlCarrito(producto){

    const carrito = obtenerCarrito();

    const existente = carrito.find(item => item.id === producto.id);

    if(existente){

        existente.cantidad += 1;

    }
    else{

        carrito.push({...producto, cantidad:1});

    }

    guardarCarrito(carrito);

    mostrarConfirmacion(producto.nombre);

}

/*======================================
        QUITAR / CAMBIAR CANTIDAD
=======================================*/

function quitarDelCarrito(id){

    let carrito = obtenerCarrito();

    carrito = carrito.filter(item => item.id !== id);

    guardarCarrito(carrito);

    if(document.getElementById("cart-table-body")){

        renderizarCarrito();

    }

}

function cambiarCantidad(id, delta){

    const carrito = obtenerCarrito();

    const item = carrito.find(i => i.id === id);

    if(!item) return;

    item.cantidad += delta;

    if(item.cantidad < 1){

        item.cantidad = 1;

    }

    guardarCarrito(carrito);

    if(document.getElementById("cart-table-body")){

        renderizarCarrito();

    }

}

/*======================================
        BADGE DEL HEADER
=======================================*/

function actualizarBadge(){

    const carrito = obtenerCarrito();

    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const badge = document.getElementById("cart-badge");

    if(badge){

        badge.textContent = total;

        badge.style.display = total > 0 ? "flex" : "none";

    }

}

/*======================================
        TOAST DE CONFIRMACION
=======================================*/

function mostrarConfirmacion(nombre){

    let toast = document.getElementById("toast-carrito");

    if(!toast){

        toast = document.createElement("div");
        toast.id = "toast-carrito";
        toast.className = "toast-carrito";
        document.body.appendChild(toast);

    }

    toast.innerHTML = `<i class="fa-solid fa-check"></i> ${nombre} agregado al carrito`;

    toast.classList.add("mostrar");

    clearTimeout(window._toastTimeout);

    window._toastTimeout = setTimeout(()=>{

        toast.classList.remove("mostrar");

    },2200);

}

/*======================================
        RENDER PAGINA CARRITO
=======================================*/

function formatoPrecio(valor){

    return "S/." + valor.toFixed(2);

}

function renderizarCarrito(){

    const carrito = obtenerCarrito();

    const cuerpo = document.getElementById("cart-table-body");
    const vacio = document.getElementById("cart-vacio");
    const tabla = document.getElementById("cart-tabla-wrap");
    const resumen = document.getElementById("cart-resumen");

    if(!cuerpo) return;

    if(carrito.length === 0){

        tabla.style.display = "none";
        resumen.style.display = "none";
        vacio.style.display = "flex";

        return;

    }

    tabla.style.display = "block";
    resumen.style.display = "block";
    vacio.style.display = "none";

    cuerpo.innerHTML = "";

    let subtotal = 0;

    carrito.forEach(item =>{

        const totalItem = item.precio * item.cantidad;

        subtotal += totalItem;

        const fila = document.createElement("div");
        fila.className = "cart-row";

        fila.innerHTML = `
            <div class="cart-cell cart-cell-producto">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div>
                    <h4>${item.nombre}</h4>
                    <span>${item.categoria}</span>
                </div>
            </div>

            <div class="cart-cell" data-label="Precio">${formatoPrecio(item.precio)}</div>

            <div class="cart-cell" data-label="Cantidad">
                <div class="cart-qty">
                    <button onclick="cambiarCantidad('${item.id}', -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad('${item.id}', 1)">+</button>
                </div>
            </div>

            <div class="cart-cell" data-label="Subtotal">${formatoPrecio(totalItem)}</div>

            <div class="cart-cell cart-cell-quitar">
                <button onclick="quitarDelCarrito('${item.id}')" title="Quitar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        cuerpo.appendChild(fila);

    });

    const envio = subtotal > 0 ? 10 : 0;

    document.getElementById("cart-subtotal").textContent = formatoPrecio(subtotal);
    document.getElementById("cart-envio").textContent = formatoPrecio(envio);
    document.getElementById("cart-total").textContent = formatoPrecio(subtotal + envio);

}

/*======================================
        VACIAR CARRITO (checkout demo)
=======================================*/

function finalizarCompra(e){

    e.preventDefault();

    const carrito = obtenerCarrito();

    if(carrito.length === 0) return;

    const numero = "URA-" + Math.floor(100000 + Math.random()*900000);

    alert("¡Gracias por tu compra! Tu pedido " + numero + " fue registrado. Nos pondremos en contacto contigo por WhatsApp para coordinar el pago y la entrega.");

    localStorage.removeItem(CART_KEY);

    renderizarCarrito();
    actualizarBadge();

}

/*======================================
        INICIO
=======================================*/

document.addEventListener("DOMContentLoaded", ()=>{

    actualizarBadge();

    if(document.getElementById("cart-table-body")){

        renderizarCarrito();

    }

});
