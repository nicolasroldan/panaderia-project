// DOM

const body = document.getElementsByTagName('body')[0];
const loginSection = document.getElementById('login');
const navSection = document.getElementById('nav');
const landingSection = document.getElementById('landing');
const aboutSection = document.getElementById('about');
const productosSection = document.getElementById('productos');
const contactoSection = document.getElementById('contacto');
const carritoSection = document.getElementById('carrito');

const ulInformePedidoFinal = document.createElement('ul');
const formLogin = document.getElementById('form-login');
const nombreUsuario = document.getElementById('display-nombre-usuario');
const btnCarrito = document.getElementById('carrito-btn');
const btnCarritoNav = document.getElementById('carrito-link-btn');
const listaPanes = document.getElementById('listaPanes');
const divResumenPedido = document.getElementById('resumen-pedido');
const btnConfirmar = document.getElementById('btn-confirmar');
const btnVolver = document.getElementById('btn-volver');
const mensajeConfirmacion = document.getElementById('confirmacion');

btnConfirmar.onclick = () => { confirmarCompra() };
btnVolver.onclick = () => { goToHomePage() };