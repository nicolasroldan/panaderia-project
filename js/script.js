// Tienda virtual para compra de panes

// Variables

let usuario;
let carrito;
let pedido;
let precioTotal;

const PRECIO_PAN_DE_CAMPO = 200;
const PRECIO_PAN_CENTENO = 250;
const PRECIO_PAN_INTEGRAL = 230;
const PRECIO_FOCACCIA = 230;
const PRECIO_PAN_HAMBURGUESA = 80;
const PRECIO_PAN_TRENZA = 100;

let listadoPanes = [];

// Funciones

// 1 - Si no existe un usuario, lo hago loggearse. Llamo a la funcion que valida el formulario (crea el usuario, lo guarda en localStorage)
// 2 -  Traigo el usuario y el carrito del localStorage
// 3 - Si existe el usuario muestro la pagina.
// 4 - Llamo a la funcion que renderiza la lista de panes
function login() {
    formLogin.submit((event) => validarFormulario(event));

    usuario = JSON.parse(localStorage.getItem('usuario'));
    carrito = JSON.parse(localStorage.getItem('carrito'));

    if (!usuario) {
        body.css('background-color', 'var(--primary-color)');
        navSection.hide();
        landingSection.hide();
        aboutSection.hide();
        productosSection.hide();
        contactoSection.hide();
        carritoSection.hide();
    } else {
        nombreUsuario.text(usuario.nombre);
        loginSection.hide();
        navSection.show();
        landingSection.show();
        aboutSection.show();
        productosSection.show();
        contactoSection.show();
    }

    if (!carrito) carrito = [];

    renderizarPanes();
}

// 1 - En el submit del form del login genero el nuevo usuario y lo guardo en localStorage
// 2 - Escondo la section de login y muestro la pagina
// 3 - Asigno el nombre del usuario en el DOM

function validarFormulario(event) {
    event.preventDefault();
    let form = event.target;
    usuario = new Usuario(form.children[1].value, form.children[3].value);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    body.css('background-color', '#F2F2F2');
    loginSection.hide();
    navSection.show();
    landingSection.show();
    aboutSection.show();
    productosSection.show();
    contactoSection.show();
    carritoSection.hide();

    nombreUsuario.text(usuario.nombre);
}

// 1 - Asigno funcion que arma el pedido a los 2 botnos de "Ir al carrito"
// 2 - Llamo a setear panes (ahi hago la carga inicial de panes y si ya tenia panes pendientes en el carrito, se los agrego al listadoPanes)
// 3 - recorro el listado de panes y los muestro en el DOM
// 4 - Llamo a la funcion renderSeccionEleccionPanes(), ahi manipulo el DOM para dejar al usuario agregar o restar panes al carrito
// 5 - Llamo a getCantidadTotalPanes() para obtener el total de los panes y mostrarlo en el DOM.
function renderizarPanes() {
    btnCarrito.click(() => armarPedido());
    btnCarritoNav.click(() => armarPedido());
    setearPanes();
    for (const pan of listadoPanes) {
        let li = $(`<li>
                     <img src="${pan.imagen}" alt="pan">
                     <p>${pan.tipo} - $${pan.costo}</p>
                     <a id="${pan.id}-add-btn" class="agregar-btn" >Agregar</a>
                     <div id="${pan.id}-add-section" class="agregar-item">
                         <div id="${pan.id}-remove">
                         <i style="color: var(--secondary-color)" class="fas fa-minus"></i>
                         </div>
                         <p id="${pan.id}-cantidad">${pan.cantidadPedido}</p>
                         <div id="${pan.id}-add">
                            <i class="fas fa-plus"></i>
                         </div>
                     </div>
                     </li>`);

        listaPanes.append(li);
        renderSeccionEleccionPanes(pan);
    }
    getCantidadTotalPanes();
    btnCarritoNav.html(`Ir al carrito ${cantidadTotalPanes > 0 ? `(${cantidadTotalPanes})` : ''}`);
    btnCarrito.html(`Ir al carrito ${cantidadTotalPanes > 0 ? `(${cantidadTotalPanes})` : ''}`);
}

// 1 - Hago la carga inicial de panes y si ya tenia panes previos pendientes en el carrito, actualizo la cantidad del pedido y el stock restante de cada pan en listadoPanes
function setearPanes() {
    listadoPanes.push(new Pan(1, 'Pan de Campo', PRECIO_PAN_DE_CAMPO, '850gr', 'images/pan-campo.jpg', 20, 0));
    listadoPanes.push(new Pan(2, 'Pan de Centeno', PRECIO_PAN_CENTENO, '1000 gr', 'images/pan-centeno.webp', 20, 0));
    listadoPanes.push(new Pan(3, 'Pan de Integral', PRECIO_PAN_INTEGRAL, '1000 gr', 'images/pan1.jfif', 20, 0));
    listadoPanes.push(new Pan(4, 'Focaccia', PRECIO_FOCACCIA, '800gr', 'images/focaccia.jpg', 20, 0));
    listadoPanes.push(new Pan(5, 'Pan de Hamburguesa', PRECIO_PAN_HAMBURGUESA, '150 gr', 'images/pan-hamburguesa.jpg', 20, 0));
    listadoPanes.push(new Pan(6, 'Pan Trenza', PRECIO_PAN_TRENZA, '250 gr', 'images/trenza.jpg', 20, 0));

    if (carrito.length > 0) {
        for (const panPendienteEnCarrito of carrito) {
            let panAReemplazar = listadoPanes.find(pan => pan.id === panPendienteEnCarrito.id);
            if (panAReemplazar) {
                panAReemplazar.cantidadPedido = panPendienteEnCarrito.cantidadPedido;
                panAReemplazar.stock = panPendienteEnCarrito.stock;
            }
        }
    }
}

// 1 - Agrego event listener a los botones que agregan y quitan panes del pedido
// 2 - Desarrollo logica uque muestra u oculta el div donde estan los botones (+) y (-)
// Si la cantidad es 0, oculto el boton (-). Si la cantidad llego al stock maximo, oculto el boton (+)
// Si recargo la pagina y tenia panes pendientes en el carrito, despliego el div que contiene los botones (+) y (-)
function renderSeccionEleccionPanes(pan) {
    let divEleccionPanes = $(`#${pan.id}-add-section`);

    $(`#${pan.id}-add`).click(() => agregarPan(pan));
    $(`#${pan.id}-remove`).click(() => removerPan(pan));

    $(`#${pan.id}-add-btn`).click(() => divEleccionPanes.fadeIn(1000).css('display', 'flex'));

    if (panDisponible(pan) && pan.cantidadPedido === 0) {
        $(`#${pan.id}-remove`).css('visibility', 'hidden');
    } else if (!panDisponible(pan)) {
        $(`${pan.id}-add`).css('visibility', 'hidden');
        $(`${pan.id}-add-btn`).html('Cantidad maxima!');
        divEleccionPanes.css('display', 'flex');
    } else if (pan.cantidadPedido > 0) {
        divEleccionPanes.css('display', 'flex');
    }
}

function panDisponible(pan) {
    return pan.stock > 0;
}

// Hago una copia del objeto pan que me viene por parametro. Si no existia el pan en el carrito le agrego una unidad (a esa copia del pan) y luego lo pusheo al carrito
// si el pan ya existia en el carrito, le agrego una unidad
// tambien incremento el pan que me viene por parametro, ya que ese es del array listadoPanes y ese array es el que se renderiza en el DOM. 
// El carrito solo lo uso para persistir los datos y cargar panes pendientes si se refresca la pagina
// Por ultimo guardo el carrito en localStorage
function agregarPan(pan) {
    let copiaPan = new Pan(pan.id, pan.tipo, pan.costo, pan.peso, pan.imagen, pan.stock, pan.cantidadPedido);

    agregarCantidad(1, pan);
    $(`#${pan.id}-cantidad`).html(`${pan.cantidadPedido}`);

    let panEnCarrito = carrito.find(element => element.id === pan.id);
    if (!panEnCarrito) {
        agregarCantidad(1, copiaPan);
        carrito.push(copiaPan);
    } else {
        agregarCantidad(1, panEnCarrito);
    }

    if (panDisponible(pan)) {
        $(`#${pan.id}-remove`).css('visibility', 'visible');
    } else {
        $(`#${pan.id}-add`).css('visibility', 'hidden');
    }

    getCantidadTotalPanes();

    btnCarrito.html(`Ir al carrito (${cantidadTotalPanes})`);
    btnCarritoNav.html(`Ir al carrito (${cantidadTotalPanes})`);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (!panDisponible(pan)) {
        $(`#${pan.id}-add-btn`).html('Cantidad maxima!');
    }
}


// 1 - Le saco una unidad al pan, y si no existia, lo pusheo al carrito
// 2 - Si restando llego a 0 unidades de ese pan, elimino el objeto del carrito
// 3 - Logica para ocultar o mostrar los botones (-) y (+) segun si el usuario eligio 0 panes o si llego al stock maximo
// 4 - Muestro la cantidad total del carrito en el DOM
// 5 - Guardo carrito en localStorage
function removerPan(pan) {
    removerCantidad(1, pan);
    $(`#${pan.id}-cantidad`).html(`${pan.cantidadPedido}`);

    for (const panActualizar of carrito) {
        if (panActualizar.id === pan.id) {
            removerCantidad(1, panActualizar);
            if (panActualizar.cantidadPedido === 0) {
                carrito.splice(carrito.indexOf(panActualizar), 1);
            }
        }
    }

    if (panDisponible(pan) && pan.cantidadPedido === 0) {
        $(`#${pan.id}-remove`).css('visibility', 'hidden');
    } else if (panDisponible(pan)) {
        $(`#${pan.id}-add`).css('visibility', 'visible');
    }

    getCantidadTotalPanes();
    btnCarrito.html(`Ir al carrito (${cantidadTotalPanes})`);
    btnCarritoNav.html(`Ir al carrito (${cantidadTotalPanes})`);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (panDisponible(pan)) {
        $(`#${pan.id}-add-btn`).html('Agregar');
    }
}

function agregarCantidad(cantidad, pan) {
    if (cantidad <= pan.stock) {
        pan.cantidadPedido += cantidad;
        pan.stock -= cantidad;
    }
}

function removerCantidad(cantidad, pan) {
    if ((pan.cantidadPedido - cantidad) >= 0) {
        pan.cantidadPedido -= cantidad;
        pan.stock += cantidad;
    }
}


// 1 - Calculo la cantidad de panes en total
function getCantidadTotalPanes() {
    cantidadTotalPanes = carrito.reduce((acum, item) => acum + item.cantidadPedido, 0);;
}

// 1 - Creo un nuevo pedido
// 2 - Muestro seccion carrito y oculto el resto de la pagina
// 3 - Renderizo en el DOM el pedido
// 4 - Muestro el boton de confirmar solo si la cantidad de panes > 0
function armarPedido() {
    pedido = new Pedido(carrito);
    precioTotal = pedido.calcularCostoPedido();
    navSection.hide();
    landingSection.hide();
    aboutSection.hide();
    productosSection.hide();
    contactoSection.hide();
    carritoSection.show();

    let innerHTML = '';

    for (const pan of carrito) {
        innerHTML += `<li>
                        <p>${pan.tipo} (x${pan.cantidadPedido}) ............</p>
                        <p>$${pan.cantidadPedido * pan.costo}</p>
                      </li>`;
    }

    innerHTML += `<li>
             <p>TOTAL: $${precioTotal}</p>
         </li>`;

    const ulInformePedidoFinal = $(`<ul>${innerHTML}</ul>`);
    divResumenPedido.empty();
    divResumenPedido.append(ulInformePedidoFinal);

    if (carrito.length > 0) {
        btnConfirmar.show();
    } else {
        btnConfirmar.hide();
    }
}

// 1 - El boton de confirmar llama a esta funcion.
// 2 - Muestro un spinner durante 5 segundos
// 3 - Elimino la data del localStorage
function confirmarCompra() {
    btnConfirmar.html('<span><i style="color: var(--primary-color)" class="fas fa-spinner fa-spin"></i></span>');
    btnVolver.fadeOut().slideUp();
    setTimeout(() => {
        btnConfirmar.remove();
        let confirmacion = generarMensajeCompra();
        mensajeConfirmacion.append(confirmacion);
        localStorage.clear();
        redireccionarAInicio();
    }, 5000)
}

// 1 - Muestro en el DOM un mensaje de despedida
function generarMensajeCompra() {
    let div = $(`<div><p>Muchas gracias por tu compra ${usuario.nombre}!</p></div>`);
    return div;
}

// 1 - El boton "Volver" llama a esta funcion, la cual redirecciona el usuario al inicio de la pagina
function goToHomePage() {
    navSection.show();
    landingSection.show();
    aboutSection.show();
    productosSection.show();
    contactoSection.show();
    carritoSection.hide();
}

// 1 - Luego de haber confimado la compra y haber vaciado el localStorage, se recarga la pagina para volver a iniciar el flujo de la app
function redireccionarAInicio() {
    let div = $('<div><p>Seras redirigidx al inicio en unos segundos...</p></div>');
    mensajeConfirmacion.append(div);
    setTimeout(() => {
        window.location.reload();
    }, 5000)
}

// Main

login();

