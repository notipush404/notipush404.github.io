import { MdNavigationDrawer } from "./MdNavigationDrawer.js"

export class MdMenuButton extends HTMLButtonElement {

 constructor() {
  super()
  this.abreDrawer = this.abreDrawer.bind(this)
 }

 connectedCallback() {
  this.type = "button"
  this.classList.add("md-standard-icon-button")
  this.innerHTML = /* HTML */
   `<span class="material-symbols-outlined">menu</span>`
  this.addEventListener("click", this.abreDrawer)
 }

 disconnectedCallback() {
  this.removeEventListener("click", this.abreDrawer)
 }

 abreDrawer() {
  const drawer = document.querySelector(".drawer")
  if (drawer instanceof MdNavigationDrawer) {
   drawer.abre()
  }
 }
}

customElements.define("md-menu-button", MdMenuButton, { extends: "button" })