import { abreElementoHtml } from "../abreElementoHtml.js"
import { cierraElementoHtmo } from "../cierraElementoHtmo.js"
import { querySelector } from "../querySelector.js"

export class MdOptionsMenu extends HTMLElement {

 getContent() {
  return /* HTML */`

   <style>

    :host {
     position: absolute;
    }

   </style>

   <slot></slot>`
 }

 constructor() {
  super()
  const shadow = this.attachShadow({ mode: "open" })
  shadow.innerHTML = this.getContent()
  this._configuraOpciones = this._configuraOpciones.bind(this)

  /**
   * @private
   * @type { HTMLSlotElement }
   */
  this._slot = querySelector(shadow, "slot")
  /**
   * @private
   * @type { HTMLElement[] }
   */
  this._opciones = []
  this._slot.addEventListener("slotchange", this._configuraOpciones)
 }

 connectedCallback() {
  this.classList.add("md-menu")
  this.role = "listbox"
 }

 /**
  * @returns {readonly Readonly<HTMLElement>[]}
  */
 get opciones() {
  return this._opciones
 }

 get seleccion() {
  /** @type { HTMLInputElement | null } */
  const seleccionado = this.querySelector(".selected")
  return seleccionado === null ? "" : seleccionado.value
 }

 _configuraOpciones() {
  /**
   * @type {HTMLElement[]}
  */
  const opciones = []
  for (const opcion of this._slot.assignedElements()) {
   opcion.role = "option"
   if (opcion instanceof HTMLElement) {
    opciones.push(opcion)
   }
  }
  this._opciones = opciones
 }

 abre() {
  abreElementoHtml(this)
 }


 cierra() {
  cierraElementoHtmo(this)
 }

 /**
  * @param {string} value
  */
 muestraValue(value) {
  let texto = ""
  for (const opcion of this._opciones) {
   if (opcion.dataset.value === value) {
    opcion.classList.add("selected")
    let textContent = opcion.textContent
    if (texto === "" && textContent !== null) {
     textContent = textContent.trim()
     if (textContent !== "") {
      texto = textContent
     }
    }
   } else {
    opcion.classList.remove("selected")
   }
  }
  return texto
 }

}

customElements.define("md-options-menu", MdOptionsMenu)