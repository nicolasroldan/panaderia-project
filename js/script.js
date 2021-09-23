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

const listadoPanes = [];

// Main

login();

// Funciones

// 1 - Si no existe un usuario, lo hago loggerase. Llamo a la funcion que valida el formulario (crea el usuario, lo guarda en localStorage)
// 2 -  Traigo el usuario y el carrito del localStorage
// 3 - Si existe el usuario muestro la pagina.
// 4 - Llamo a la funcion que renderiza la lista de panes
function login() {
    formLogin.onsubmit = (event) => { validarFormulario(event) };

    usuario = JSON.parse(localStorage.getItem('usuario'));
    carrito = JSON.parse(localStorage.getItem('carrito'));

    if (!usuario) {
        body.style.backgroundColor = 'var(--primary-color)';
        loginSection.style.display = 'block';
        navSection.style.display = 'none';
        landingSection.style.display = 'none';
        aboutSection.style.display = 'none';
        productosSection.style.display = 'none';
        contactoSection.style.display = 'none';
        carritoSection.style.display = 'none';
    } else {
        nombreUsuario.innerText = usuario.nombre;
        loginSection.style.display = 'none';
        navSection.style.display = 'block';
        landingSection.style.display = 'block';
        aboutSection.style.display = 'block';
        productosSection.style.display = 'block';
        contactoSection.style.display = 'block';
        carritoSection.style.display = 'none';
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

    body.style.backgroundColor = '#F2F2F2';
    loginSection.style.display = 'none';
    navSection.style.display = 'block';
    landingSection.style.display = 'block';
    aboutSection.style.display = 'block';
    productosSection.style.display = 'block';
    contactoSection.style.display = 'block';
    carritoSection.style.display = 'none';

    nombreUsuario.innerText = usuario.nombre;
}

function renderizarPanes() {
    document.getElementById('carrito-btn').onclick = () => { armarPedido() };
    document.getElementById('carrito-link-btn').onclick = () => { armarPedido() };


    listadoPanes.push(new Pan(1, 'Pan de Campo', PRECIO_PAN_DE_CAMPO, '850gr', 'images/pan-campo.jpg', 20, 0));
    listadoPanes.push(new Pan(2, 'Pan de Centeno', PRECIO_PAN_CENTENO, '1000 gr', 'images/pan-centeno.webp', 20, 0));
    listadoPanes.push(new Pan(3, 'Pan de Integral', PRECIO_PAN_INTEGRAL, '1000 gr', 'images/pan1.jfif', 20, 0));
    listadoPanes.push(new Pan(4, 'Focaccia', PRECIO_FOCACCIA, '800gr', 'images/focaccia.jpg', 20, 0));
    listadoPanes.push(new Pan(5, 'Pan de Hamburguesa', PRECIO_PAN_HAMBURGUESA, '150 gr', 'images/pan-hamburguesa.jpg', 20, 0));
    listadoPanes.push(new Pan(6, 'Pan Trenza', PRECIO_PAN_TRENZA, '250 gr', 'images/trenza.jpg', 20, 0));

    // Cargar panes desde el carrito

    if (carrito.length > 0) {
        carrito.forEach(panAComprar => {
            let panAReemplazar = listadoPanes.find(panInicial => panInicial.id === panAComprar.id);

            if (panAReemplazar) {
                panAReemplazar.cantidadPedido = panAComprar.cantidadPedido;
                panAReemplazar.stock = panAComprar.stock;
            }
        })
    }

    listadoPanes.forEach(pan => {
        let li = document.createElement('li');
        li.innerHTML = `
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
                     </div>`
        document.getElementById('listaPanes').appendChild(li);



        document.getElementById(`${pan.id}-add`).onclick = () => { agregarPan(pan) };
        document.getElementById(`${pan.id}-remove`).onclick = () => { removerPan(pan) };
        document.getElementById(`${pan.id}-add-btn`).onclick = () => {
            let elementos = document.getElementById(`${pan.id}-add-section`)
            elementos.style.display = 'flex';

        };
        // debugger
        if (panDisponible(pan) && pan.cantidadPedido === 0) {
            document.getElementById(`${pan.id}-remove`).style.visibility = 'hidden';
        } else if (!panDisponible(pan)) {
            document.getElementById(`${pan.id}-add`).style.visibility = 'hidden';
            document.getElementById(`${pan.id}-add-btn`).innerHTML = 'Cantidad maxima!'
            let elementos = document.getElementById(`${pan.id}-add-section`)
            elementos.style.display = 'flex';
        } else if (pan.cantidadPedido > 0) {
            let elementos = document.getElementById(`${pan.id}-add-section`)
            elementos.style.display = 'flex';
        }
    });

    getCantidadTotalPanes();
    document.getElementById('carrito-btn').innerHTML = `Ir al carrito (${cantidadTotalPanes})`;
}

function panDisponible(pan) {
    if (pan.stock > 0) {
        return true;
    } else {
        return false;
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

function agregarPan(pan) {
    //si no hacia esta copia del objeto pan, se modificaba el objeto que pushee al carrito
    let copiaPan = JSON.parse(JSON.stringify(pan));
    let panEnCarrito = carrito.find(element => element.id === pan.id);

    agregarCantidad(1, pan);
    document.getElementById(`${pan.id}-cantidad`).innerHTML = `${pan.cantidadPedido}`;

    if (!panEnCarrito) {
        agregarCantidad(1, copiaPan);
        carrito.push(copiaPan);
    } else {
        carrito.forEach(panActualizar => {
            if (panActualizar.id === pan.id) {
                agregarCantidad(1, panActualizar);
            }
        })
    }

    // let panEnCarrito = carrito.find(element => element.id === pan.id);

    // agregarCantidad(1, pan);
    // document.getElementById(`${pan.id}-cantidad`).innerHTML = `${pan.cantidadPedido}`;

    // if (!panEnCarrito) {
    //     carrito.push(pan);
    // } else {
    //     carrito.forEach(panActualizar => {
    //         if(panActualizar.id === pan.id) {
    //             agregarCantidad(1, panActualizar);
    //         }
    //     })
    // }
    if (panDisponible(pan)) {
        document.getElementById(`${pan.id}-remove`).style.visibility = 'visible';
    } else {
        document.getElementById(`${pan.id}-add`).style.visibility = 'hidden';
    }
    getCantidadTotalPanes();
    document.getElementById('carrito-btn').innerHTML = `Ir al carrito (${cantidadTotalPanes})`;
    document.getElementById('carrito-link-btn').innerHTML = `Ir al carrito (${cantidadTotalPanes})`;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (!panDisponible(pan)) {
        document.getElementById(`${pan.id}-add-btn`).innerHTML = 'Cantidad maxima!'
    }
}

function removerPan(pan) {
    let panEnCarrito = carrito.find(element => element.id === pan.id);
    removerCantidad(1, pan);
    document.getElementById(`${pan.id}-cantidad`).innerHTML = `${pan.cantidadPedido}`;

    if (!panEnCarrito) {
        carrito.push(pan)
    } else {
        carrito.forEach((panActualizar, index) => {
            if (panActualizar.id === pan.id) {
                removerCantidad(1, panActualizar);
                if (panActualizar.cantidadPedido === 0) {
                    carrito.splice(index, 1)
                }
            }
        })
    }
    
    if (panDisponible(pan) && pan.cantidadPedido === 0) {
        document.getElementById(`${pan.id}-remove`).style.visibility = 'hidden';
    } else if (panDisponible(pan)) {
        document.getElementById(`${pan.id}-add`).style.visibility = 'visible';

    }
   
    getCantidadTotalPanes();
    document.getElementById('carrito-btn').innerHTML = `Ir al carrito (${cantidadTotalPanes})`;
    document.getElementById('carrito-link-btn').innerHTML = `Ir al carrito (${cantidadTotalPanes})`;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (panDisponible(pan)) {
        document.getElementById(`${pan.id}-add-btn`).innerHTML = 'Agregar';
    }
}

function getCantidadTotalPanes() {
    cantidadTotalPanes = listadoPanes.reduce((acum, item) => acum + item.cantidadPedido, 0);;
}

function vaciarCarrito() {
    carrito = [];
}
//Funcion que calcula el costo total del pedido
function armarPedido() {
    pedido = new Pedido(carrito);
    precioTotal = pedido.calcularCostoPedido();
    navSection.style.display = 'none';
    landingSection.style.display = 'none';
    aboutSection.style.display = 'none';
    productosSection.style.display = 'none';
    contactoSection.style.display = 'none';
    carritoSection.style.display = 'block';


    ulInformePedidoFinal.innerHTML = '';

    carrito.forEach(pan => {
        ulInformePedidoFinal.innerHTML += `<li>
        <p>${pan.tipo} (x${pan.cantidadPedido}) ............</p>
        <p>$${pan.cantidadPedido * pan.costo}</p>
    </li>`;
    })
    ulInformePedidoFinal.innerHTML += `<li>
             <p>TOTAL: $${precioTotal}</p>
         </li>`;
    document.getElementById('resumen-pedido').appendChild(ulInformePedidoFinal);


    document.getElementById('resumen-pedido').appendChild(ulInformePedidoFinal);
    if (carrito.length > 0) {
        document.getElementById('btn-confirmar').style.display = 'inline-block';
    } else {
        document.getElementById('btn-confirmar').style.display = 'none';
    }
}

function confirmarCompra() {
    document.getElementById('btn-confirmar').innerHTML = '<span><i style="color: var(--primary-color)" class="fas fa-spinner fa-spin"></i></span>'
    setTimeout(() => {
        let botonConfirmar = document.getElementById('btn-confirmar');
        let botonVolver = document.getElementById('btn-volver');
        botonConfirmar.parentNode.removeChild(botonConfirmar);
        botonVolver.parentNode.removeChild(botonVolver);
        let confirmacion = generarMensajeCompra();
        document.getElementById('confirmacion').append(confirmacion);
        vaciarCarrito();
        localStorage.clear();
        redireccionarAInicio();

    }, 5000)
}

function generarMensajeCompra() {
    let div = document.createElement('div');
    div.innerHTML = `<p>Muchas gracias por tu compra ${usuario.nombre}!</p>`
    return div;
}

function goToHomePage() {
    document.getElementById('nav').style.display = 'block';
    landingSection.style.display = 'block';
    aboutSection.style.display = 'block';
    productosSection.style.display = 'block';
    contactoSection.style.display = 'block';
    carritoSection.style.display = 'none';
}

function redireccionarAInicio() {
    let div = document.createElement('div');
    div.innerHTML = '<p>Seras redirigidx al inicio en unos segundos...</p>'
    document.getElementById('confirmacion').append(div);
    setTimeout(() => {

        window.location.reload();
    }, 5000)
}


