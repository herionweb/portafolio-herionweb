import { ScrollTopBtn } from "./boton_subir.js";

document.addEventListener("DOMContentLoaded", e => {
    ScrollTopBtn('.scroll-top-btn');
});

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    /*Active link*/
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    /*Remove menu mobile*/
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '10px',
    duration: 1000,
    reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title', {});
sr.reveal('.button', { delay: 200 });
sr.reveal('.home__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal('.about__img', {});
sr.reveal('.about__subtitle', { delay: 400 });
sr.reveal('.about__text', { delay: 400 });

// VALIDACIONES

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    textarea: /^[a - z]{ 4, 100}(, [a - z]{ 4, 100 })*/
}

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    textarea: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "asunto":
            validarCampo(expresiones.asunto, e.target, 'asunto');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

// FORMULARIO

function Loader() {
    const $loader = document.createElement("img");
    $loader.src = "./app/assets/loader.svg";
    $loader.alt = "Cargando...";
    $loader.classList.add("loader");

    return $loader;
}

const d = document;
const $form = d.querySelector(".contact-form")

d.addEventListener("submit", e => {
    e.preventDefault();
    const $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    if (!campos.nombre && !campos.correo && !campos.telefono && !campos.asunto) {
        $loader.classList.add("none");
        return false;
    }

    fetch("https://formsubmit.co/ajax/alejandro_fernandez_sanchez@hotmail.es", {
            method: "POST",
            body: new FormData(e.target)
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {


            $loader.classList.add("none");
            $response.classList.remove("none");
            $response.innerHTML = `<p>Los datos han sido enviados</p>`;
            document.querySelector("#grupo__nombre i").classList.remove('fa-check-circle');
            document.querySelector("#grupo__correo i").classList.remove('fa-check-circle');
            document.querySelector("#grupo__telefono i").classList.remove('fa-check-circle');
            $form.reset();
        })
        .catch(err => {
            let message = err.statusText || "Ocurrió un error al enviar , intentalo de nuevo";
            $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        })
        .finally(() => setTimeout(() => {
            $response.classList.add("none");
            $response.innerHTML = "";
        }, 13000));

});