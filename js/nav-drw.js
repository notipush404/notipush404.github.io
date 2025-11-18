import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js"
import { MdNavigationDrawer } from "../lib/js/custom/MdNavigationDrawer.js"

export class NavDrw extends MdNavigationDrawer {

 /**
  * @override
  */
 getHipervinculos() {
  return /* HTML */`
   <h1>PWA con MD</h1>

   <a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
    <span class="material-symbols-outlined">home</span>
    Inicio
   </a>

   <a ${resaltaSiEstasEn(["/secundaria.html"])} href="secundaria.html">
    <span class="material-symbols-outlined">scrollable_header</span>
    Página secundaria
   </a>

   <a ${resaltaSiEstasEn(["/iconos.html"])} href="iconos.html">
    <span class="material-symbols-outlined">sentiment_satisfied</span>
    Íconos
   </a>

   <a ${resaltaSiEstasEn(["/botones.html"])} href="botones.html">
    <span class="material-symbols-outlined">right_click</span>
    Botones
   </a>

   <a ${resaltaSiEstasEn(["/campos.html"])} href="campos.html">
    <span class="material-symbols-outlined">password</span>
    Campos de texto
   </a>

   <a ${resaltaSiEstasEn(["/select.html"])} href="select.html">
    <span class="material-symbols-outlined">bottom_panel_close</span>
    Select
   </a>

   <a ${resaltaSiEstasEn(["/interruptor.html"])} href="interruptor.html">
    <span class="material-symbols-outlined">toggle_on</span>
    Interruptores
   </a>

   <a ${resaltaSiEstasEn(["/slider.html"])} href="slider.html">
    <span class="material-symbols-outlined">linear_scale</span>
    Sliders
   </a>

   <a ${resaltaSiEstasEn(["/segmentado.html"])} href="segmentado.html">
    <span class="material-symbols-outlined">splitscreen_left</span>
    Botón segmentado
   </a>

   <a ${resaltaSiEstasEn(["/one-line.html"])} href="one-line.html">
    <span class="material-symbols-outlined">list</span>
    Listas one-line
   </a>

   <a ${resaltaSiEstasEn(["/two-line.html"])} href="two-line.html">
    <span class="material-symbols-outlined">lists</span>
    Listas two-line
   </a>

   <a ${resaltaSiEstasEn(["/three-line.html"])} href="three-line.html">
    <span class="material-symbols-outlined">receipt_long</span>
    Listas three-line
   </a>

   <a ${resaltaSiEstasEn(["/tarjetas.html"])} href="tarjetas.html">
    <span class="material-symbols-outlined">cards</span>
    Tarjetas
   </a>

   <a ${resaltaSiEstasEn(["/navtab.html"])} href="navtab.html">
    <span class="material-symbols-outlined">swipe_left</span>
    Pestañas scrollable
   </a>

   <a ${resaltaSiEstasEn(["/navTabFixed.html"])} href="navTabFixed.html">
    <span class="material-symbols-outlined">tabs</span>
    Pestañas fijas
   </a>

   <a ${resaltaSiEstasEn(["/navbar.html"])} href="navbar.html">
    <span class="material-symbols-outlined">bottom_navigation</span>
    Barra de navegación
   </a>

   <a ${resaltaSiEstasEn(["/formulario.html"])} href="formulario.html">
    <span class="material-symbols-outlined">newspaper</span>
    Formulario
   </a>

   <a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
    <span class="material-symbols-outlined">help</span>
    Ayuda
   </a>`
 }

}

customElements.define("nav-drw", NavDrw)