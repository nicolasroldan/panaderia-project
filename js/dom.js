// DOM

const ulInformePedidoFinal = document.createElement('ul');
const formLogin = document.getElementById('form-login');

// Sections

const body = document.getElementsByTagName('body')[0];
const loginSection = document.getElementById('login');
const navSection = document.getElementById('nav');
const landingSection = document.getElementById('landing');
const aboutSection = document.getElementById('about');
const productosSection = document.getElementById('productos');
const contactoSection = document.getElementById('contacto');
const carritoSection = document.getElementById('carrito');

//////

const nombreUsuario = document.getElementById('display-nombre-usuario');
const btnCarrito = document.getElementById('carrito-btn');
const btnCarritoNav = document.getElementById('carrito-link-btn');
const listaPanes = document.getElementById('listaPanes');
const divResumenPedido = document.getElementById('resumen-pedido');
const btnConfirmar = document.getElementById('btn-confirmar');
btnConfirmar.onclick = () => { confirmarCompra() };
const btnVolver = document.getElementById('btn-volver');
btnVolver.onclick = () => { goToHomePage() };
const mensajeConfirmacion = document.getElementById('confirmacion');