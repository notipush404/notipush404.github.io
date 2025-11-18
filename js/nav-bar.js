import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js"

export class NavBar extends HTMLElement {

 connectedCallback() {
  this.classList.add("md-navigation-bar")

  this.innerHTML = /* HTML */`
   <a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
    <span class="material-symbols-outlined">home</span>
    Inicio
   </a>

   <a ${resaltaSiEstasEn(["/navTabFixed.html"])} href="navTabFixed.html">
    <span class="material-symbols-outlined">tabs</span>
    Pestañas
   </a>

   <a id="navbar" ${resaltaSiEstasEn(["/navbar.html"])} href="navbar.html">
    <span class="material-symbols-outlined">bottom_navigation</span>
    Barra
   </a>

   <a ${resaltaSiEstasEn(["/formulario.html"])} href="formulario.html">
    <span class="material-symbols-outlined">newspaper</span>
    Forma
   </a>`

 }

}

customElements.define("nav-bar", NavBar)