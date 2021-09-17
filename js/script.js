// Tienda virtual para compra de panes

// Clases
class Usuario {
    constructor(id, nombre, email, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.direccion = direccion;
    }
}

class Pan {
    constructor(id, tipo, costo, peso, imagen) {
        this.id = id ? id : 0;
        this.tipo = tipo;
        this.costo = costo;
        this.peso = peso;
        this.imagen = imagen ? imagen : '';
    }
}

class Pedido {
    constructor(idUsuario, numeroPedido, carrito, direccionEntrega) {
        this.idUsuario = idUsuario;
        this.numeroPedido = numeroPedido,
            this.carrito = carrito ? carrito : [];
        this.direccionEntrega = direccionEntrega;
    }

    calcularCostoPedido() {
        const costoPedido = this.carrito.reduce((acum, item) => acum + item.costo, 0);
        return costoPedido;
    }
}

// Variables

let usuario;
let carrito;
let pedido;

let cantidadTotalPanes;
let cantidadPanDeCampo = 0;
let cantidadPanCenteno = 0;
let cantidadPanIntegral = 0;
let cantidadFocaccia = 0;
let cantidadPanHamburguesa = 0;
let cantidadPanTrenza = 0;

let panesDeCampoPendientes = [];
let panesDeCentenoPendientes = [];
let panesIntegralesPendientes = [];
let panesFocacciasPendientes = [];
let panesHamburguesaPendientes = [];
let panesTrenzaPendientes = [];

let precioTotal;

const TIEMPO_ELABORACION = 2;
const PRECIO_PAN_DE_CAMPO = 200;
const PRECIO_PAN_CENTENO = 250;
const PRECIO_PAN_INTEGRAL = 230;
const PRECIO_FOCACCIA = 230;
const PRECIO_PAN_HAMBURGUESA = 80;
const PRECIO_PAN_TRENZA = 100;

let generadorIdUsuarios = 1;
let generadorIdPedidos = 1;
const listadoPanes = [];

// Funciones

//Funcion que carga el listado de panes disponibles y los renderiza en el HTML
function renderizarPanes() {
    listadoPanes.push(new Pan(1, 'Pan de Campo', PRECIO_PAN_DE_CAMPO, '850gr', 'images/pan-campo.jpg'));
    listadoPanes.push(new Pan(2, 'Pan de Centeno', PRECIO_PAN_CENTENO, '1000 gr', 'images/pan-centeno.webp'));
    listadoPanes.push(new Pan(3, 'Pan de Integral', PRECIO_PAN_INTEGRAL, '1000 gr', 'images/pan1.jfif'));
    listadoPanes.push(new Pan(4, 'Focaccia', PRECIO_FOCACCIA, '800gr', 'images/focaccia.jpg'));
    listadoPanes.push(new Pan(5, 'Pan de Hamburguesa', PRECIO_PAN_HAMBURGUESA, '150 gr', 'images/pan-hamburguesa.jpg'));
    listadoPanes.push(new Pan(6, 'Pan Trenza', PRECIO_PAN_TRENZA, '250 gr', 'images/trenza.jpg'));

    listadoPanes.forEach(pan => {
        let li = document.createElement('li');
        li.id = pan.id;
        li.innerHTML = `
                     <img src="${pan.imagen}" alt="pan">
                     <p>${pan.tipo} - $${pan.costo}</p>
                     <a class="agregar-btn" href="">Agregar</a>
                     <div class="agregar-item">
                         <i class="fas fa-minus"></i>
                         <p>0</p>
                         <i class="fas fa-plus"></i>
                     </div>`
        document.getElementById('listaPanes').appendChild(li);
    });
}

// Funcion que da de alta y genera el nuevo usuario (si no lo encontro previamente en el localStorage)
// Tambien chequea si tenia compras pendientes en el carrito, sino inicializa el array vacio
function altaUsuario() {
    usuario = JSON.parse(localStorage.getItem('usuario'));
    carrito = JSON.parse(localStorage.getItem('carrito'));

    if (!usuario) {
        const nombreUsuario = prompt('Vamos a tomar sus datos para procesar el pedido y su entrega.\nPor favor ingrese su nombre:');
        const emailUsuario = prompt('Ingrese su email:');
        const direccionUsuario = prompt('Ingrese la direccion de la entrega del pedido:');

        usuario = new Usuario(generadorIdUsuarios, nombreUsuario, emailUsuario, direccionUsuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        generadorIdUsuarios++;
    } else {
        console.log(`Bienvenidx ${usuario.nombre}`);
    }

    if (!carrito) carrito = [];

}

//Funcion que solicita al usuario que panes quiere agregar al carrito y los pushea al array carrito
// Luego recorre el carrito filtrando por cada tipo de pan, para acumular la cantidad a comprar de cada pan
function solicitarCantidades() {
    let inputPanDeCampo = parseInt(prompt('¿Cuantos panes de campo desea llevar?'));
    let inputPanCenteno = parseInt(prompt('¿Cuantos panes de centeno desea llevar?'));
    let inputPanIntegral = parseInt(prompt('¿Cuantos panes integrales desea llevar?'));
    let inputFocaccia = parseInt(prompt('¿Cuantas focaccias desea llevar?'));
    let inputPanHamburguesa = parseInt(prompt('¿Cuantos panes de hamburguesa desea llevar?'));
    let inputPanTrenza = parseInt(prompt('¿Cuantos panes Trenza desea llevar?'));

    if (inputPanDeCampo > 0) {
        for (let i = 0; i < inputPanDeCampo; i++) {
            carrito.push(new Pan(1, 'Pan de Campo', PRECIO_PAN_DE_CAMPO, '850 gr', ''));
        }
    }

    if (inputPanCenteno > 0) {
        for (let i = 0; i < inputPanCenteno; i++) {
            carrito.push(new Pan(2, 'Pan de Centeno', PRECIO_PAN_CENTENO, '1000 gr', ''));
        }
    }

    if (inputPanIntegral > 0) {
        for (let i = 0; i < inputPanIntegral; i++) {
            carrito.push(new Pan(3, 'Pan Integral', PRECIO_PAN_INTEGRAL, '1000 gr', ''));
        }
    }

    if (inputFocaccia > 0) {
        for (let i = 0; i < inputFocaccia; i++) {
            carrito.push(new Pan(4, 'Focaccia', PRECIO_FOCACCIA, '800 gr', ''));
        }
    }

    if (inputPanHamburguesa > 0) {
        for (let i = 0; i < inputPanHamburguesa; i++) {
            carrito.push(new Pan(5, 'Pan de Hamburguesa', PRECIO_PAN_HAMBURGUESA, '150 gr', ''));
        }
    }

    if (inputPanTrenza > 0) {
        for (let i = 0; i < inputPanTrenza; i++) {
            carrito.push(new Pan(6, 'Pan Trenza', PRECIO_PAN_TRENZA, '250 gr', ''));
        }
    }

    cantidadTotalPanes = carrito.length;

    panesDeCampoPendientes = carrito.filter(item => item.tipo === 'Pan de Campo');
    cantidadPanDeCampo += panesDeCampoPendientes.length;
    panesDeCentenoPendientes = carrito.filter(item => item.tipo === 'Pan de Centeno');
    cantidadPanCenteno += panesDeCentenoPendientes.length;
    panesIntegralesPendientes = carrito.filter(item => item.tipo === 'Pan Integral');
    cantidadPanIntegral += panesIntegralesPendientes.length;
    panesFocacciasPendientes = carrito.filter(item => item.tipo === 'Focaccia');
    cantidadFocaccia += panesFocacciasPendientes.length;
    panesHamburguesaPendientes = carrito.filter(item => item.tipo === 'Pan de Hamburguesa');
    cantidadPanHamburguesa += panesHamburguesaPendientes.length;
    panesTrenzaPendientes = carrito.filter(item => item.tipo === 'Pan Trenza');
    cantidadPanTrenza += panesTrenzaPendientes.length;
}

//Funcion que calcula el costo total del pedido
function armarPedido() {
    pedido = new Pedido(usuario.id, generadorIdPedidos, carrito, usuario.direccion);
    precioTotal = pedido.calcularCostoPedido();
    generadorIdPedidos++;
    return precioTotal;
}

//Funcion que devuelve mensaje final luego de confirmar la compra
// Si el usuario confirma la compra se vacia el carrito y se guarda en el localStorage y luego se le informa el costo total de su pedido
//Si el usuario no confirma se actualiza el carrito en localStorage con el pedido pendiente en el carrito
function informarEntrega(costo) {
    let confirmaCompra = prompt('¿Confirmas la compra?');

    if (confirmaCompra.toUpperCase() === 'SI') {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito))

        console.log(`
        Hola ${usuario.nombre}!\n
        Tu pedido (nro° ${pedido.numeroPedido}) es:\n
        Panes de campo (${cantidadPanDeCampo})\n
        Panes de centeno (${cantidadPanCenteno})\n
        Panes Integrales (${cantidadPanIntegral})\n
        Focaccias (${cantidadFocaccia})\n
        Panes de Hamburguesa (${cantidadPanHamburguesa})\n
        Panes Trenza (${cantidadPanTrenza})\n
        Total (${cantidadTotalPanes}) panes\n
        El costo total es de $${costo} y tu pedido estara listo en ${TIEMPO_ELABORACION} dias.\n
        Te lo llevaremos a la direccion que nos indicaste: ${usuario.direccion}.\n
        Muchas gracias por tu compra!`);
    } else {
        localStorage.setItem('carrito', JSON.stringify(carrito))
        console.log('Tu pedido quedara pendiente en el carrito de compras para cuando gustes confirmar la compra!')
    }

}

// Main
renderizarPanes();
altaUsuario();
solicitarCantidades();
informarEntrega(armarPedido());

