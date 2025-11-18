import { ES_APPLE } from "../const/ES_APPLE.js"

export class MdOverflowButton extends HTMLButtonElement {

 connectedCallback() {
  this.type = "button"
  this.classList.add("md-standard-icon-button")
  this.innerHTML = ES_APPLE
   ? /* HTML */
   `<span style="color: var(--md-sys-color-on-surface-variant)"
     class="material-symbols-outlined">
    more_horiz
   </span>`
   : /* HTML */
   `<span style="color: var(--md-sys-color-on-surface-variant)"
     class="material-symbols-outlined">
    more_vert
   </span>`
 }

}

customElements
 .define("md-overflow-button", MdOverflowButton, { extends: "button" })