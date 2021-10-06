// DOM

const body = $('body');
const loginSection = $('#login');
const navSection = $('#nav')
const landingSection = $('#landing');
const aboutSection = $('#about');
const productosSection = $('#productos');
const contactoSection = $('#contacto');
const carritoSection = $('#carrito');

const formLogin = $('#form-login');
const nombreUsuario = $('#display-nombre-usuario');
const btnCarrito = $('#carrito-btn');
const btnCarritoNav = $('#carrito-link-btn');
const listaPanes = $('#listaPanes');
const divResumenPedido = $('#resumen-pedido');
const btnConfirmar = $('#btn-confirmar');
const btnVolver = $('#btn-volver');
const mensajeConfirmacion = $('#confirmacion');

btnConfirmar.click(() => confirmarCompra());
btnVolver.click(() => goToHomePage());