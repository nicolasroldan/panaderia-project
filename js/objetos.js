// Clases

class Usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}

class Pan {
    constructor(id, tipo, costo, peso, imagen, stock, cantidadPedido) {
        this.id = id;
        this.tipo = tipo;
        this.costo = costo;
        this.peso = peso;
        this.imagen = imagen ? imagen : '';
        this.stock = stock;
        this.cantidadPedido = cantidadPedido;
    }
}

class Pedido {
    constructor(carrito) {
        this.carrito = carrito ? carrito : [];
    }

    calcularCostoPedido() {
        const costoPedido = this.carrito.reduce((acum, item) => acum + (item.costo * item.cantidadPedido), 0);
        return costoPedido;
    }
}