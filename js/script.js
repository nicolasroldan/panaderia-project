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
    constructor(tipo, costo, peso) {
        this.tipo = tipo;
        this.costo = costo;
        this.peso = peso;
    }
}

class Pedido {
    constructor(idUsuario, numeroPedido, items, direccionEntrega) {
        this.idUsuario = idUsuario;
        this.numeroPedido = numeroPedido,
            this.items = items ? items : [];
        this.direccionEntrega = direccionEntrega;
    }

    calcularCostoPedido() {
        const costoPedido = this.items.reduce((acum, item) => acum + item.costo, 0);
        return costoPedido;
    }
}

// Variables
let usuario;
let items = [];
let pedido;
let cantidadTotalPanes;
let cantidadPanDeCampo;
let cantidadPanCenteno;
let precioTotal;
const TIEMPO_ELABORACION = 2;
const PRECIO_PAN_DE_CAMPO = 200;
const PRECIO_PAN_CENTENO = 250;
let generadorIdUsuarios = 1;
let generadorIdPedidos = 1;

// Funciones

function altaUsuario() {
    const nombreUsuario = prompt('Vamos a tomar sus datos para procesar el pedido y su entrega.\nPor favor ingrese su nombre:');
    const emailUsuario = prompt('Ingrese su email:');
    const direccionUsuario = prompt('Ingrese la direccion de la entrega del pedido:');

    usuario = new Usuario(generadorIdUsuarios, nombreUsuario, emailUsuario, direccionUsuario);

    generadorIdUsuarios++;
}

function solicitarCantidades() {
    cantidadPanDeCampo = parseInt(prompt('¿Cuantos panes de campo desea llevar?'));
    cantidadPanCenteno = parseInt(prompt('¿Cuantos panes de centeno desea llevar?'));

    if (cantidadPanDeCampo > 0) {
        for (let i = 0; i < cantidadPanDeCampo; i++) {
            items.push(new Pan('Pan de Campo', PRECIO_PAN_DE_CAMPO, '850 gr'));
        }
    }

    if (cantidadPanCenteno > 0) {
        for (let i = 0; i < cantidadPanCenteno; i++) {
            items.push(new Pan('Pan de Centeno', PRECIO_PAN_CENTENO, '1000 gr'));
        }
    }
    cantidadTotalPanes = items.length;
}

function armarPedido() {
    pedido = new Pedido(usuario.id, generadorIdPedidos, items, usuario.direccion);
    precioTotal = pedido.calcularCostoPedido();
    generadorIdPedidos++;
    return precioTotal;
}

function informarEntrega(costo) {
    console.log(`
    Hola ${usuario.nombre}!\n
    Tu pedido (nro° ${pedido.numeroPedido}) es:\n
    Panes de campo (${cantidadPanDeCampo})\n
    Panes de centeno (${cantidadPanCenteno})\n
    Total (${cantidadTotalPanes}) panes\n
    El costo total es de $${costo} y tu pedido estara listo en ${TIEMPO_ELABORACION} dias.\n
    Te lo llevaremos a la direccion que nos indicaste: ${usuario.direccion}.\n
    Muchas gracias por tu compra!`);
}

// Main

altaUsuario();
solicitarCantidades();
informarEntrega(armarPedido());

localStorage.setItem('idUsuario', usuario.id);
localStorage.setItem('nombreUsuario', usuario.nombre);
localStorage.setItem('carrito', JSON.stringify(pedido))
