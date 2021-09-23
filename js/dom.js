// DOM

let ulInformePedidoFinal = document.createElement('ul');
let btnVolver = document.getElementById('btn-volver').onclick = () => { goToHomePage() };
let btnConfirmar = document.getElementById('btn-confirmar').onclick = () => { confirmarCompra() };



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