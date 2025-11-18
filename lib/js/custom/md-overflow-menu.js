import { abreElementoHtml } from "../abreElementoHtml.js"
import { cierraElementoHtmo } from "../cierraElementoHtmo.js"

export class MdOverflowMenu extends HTMLElement {

 getContent() {
  return /* HTML */`

   <style>

    :host {
     position: fixed;
     min-width: 7rem;
     max-width: 280px;
    }

    ::slotted(*) {
     text-align: start;
     width: 100%;
     border: none;
     background-color: transparent;
    }

   </style>

   <slot></slot>`
 }

 constructor() {
  super()
  const shadow = this.attachShadow({ mode: "open" })
  shadow.innerHTML = this.getContent()
  this.clicCierra = this.clicCierra.bind(this)
  /**
  * @private
  * @type {HTMLButtonElement| null}
  */
  this._toggleButton = null
 }

 connectedCallback() {
  this.classList.add("md-menu")
  this.role = "menu"
 }

 /**
  * @param {HTMLButtonElement} toggleButton
  */
 alterna(toggleButton) {
  this._toggleButton = toggleButton
  const top = toggleButton.offsetTop + toggleButton.offsetHeight - 4
  const right =
   innerWidth - (toggleButton.offsetLeft + toggleButton.offsetWidth) - 3
  this.style.top = `${top}px`
  this.style.right = `${right}px`
  const list = this.classList
  if (list.contains("open")) {
   this.cierra()
  } else {
   this.abre()
  }
 }

 abre() {
  document.addEventListener("click", this.clicCierra)
  abreElementoHtml(this)
 }

 cierra() {
  document.removeEventListener("click", this.clicCierra)
  cierraElementoHtmo(this)
 }

 /**
  * @param {Event} evt
  */
 clicCierra(evt) {
  const target = evt.target
  if (this.classList.contains("open")
   && this._toggleButton !== null
   && target instanceof HTMLElement
   && !this._toggleButton.contains(target)) {
   this.cierra()
  }
 }
}

customElements.define("md-overflow-menu", MdOverflowMenu)