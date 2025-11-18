import { getAttribute } from "../getAttribute.js"
import { querySelector } from "../querySelector.js"
import { MdOptionsMenu } from "./md-options-menu.js"

export class MdSelectMenu extends HTMLElement {
 static formAssociated = true;
 static get observedAttributes() {
  return ["options", "value", "required"]
 }

 getContent() {
  return /* HTML */ `
   <link rel="stylesheet" href="/lib/css/material-symbols-outlined.css">

   <style>
    :host {
     display: block;
     cursor: default;
    }

    output {
     display: block;
     padding-right: 2rem;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
    }

    #up {
     position: absolute;
     bottom: 0.5rem;
     right: 0.75rem;
     display: none;
     color: var(--md-sys-color-on-surface-variant);
    }

    #down {
     position: absolute;
     bottom: 0.5rem;
     right: 0.75rem;
     color: var(--md-sys-color-on-surface-variant);
    }

    :host(.open) #up {
     display: inline-block;
    }

    :host(.open) #down {
     display: none;
    }

    :host(:invalid) #up,
    :host(:invalid) #down {
     color: var(--md-sys-color-error);
    }

   </style>
   <output></output>
   <span id="down" class="material-symbols-outlined">
    arrow_drop_down
   </span>
   <span id="up" class="material-symbols-outlined">
    arrow_drop_up
   </span>`
 }

 constructor() {
  super()
  
  const shadow = this.attachShadow({ mode: "open" })
  shadow.innerHTML = this.getContent()

  this._alterna = this._alterna.bind(this)
  this._onKeyDown = this._onKeyDown.bind(this)
  this._cierra = this._cierra.bind(this)
  this._clicEnDialogo = this._clicEnDialogo.bind(this)
  this.clicExterno = this.clicExterno.bind(this)
  this.muestraValue = this.muestraValue.bind(this)

  /**
   * @private
   * @type {string}
   */
  this._customValidity = ""

  /**
   * @private
   * @type { HTMLOutputElement }
   */
  this.output = querySelector(shadow, "output")
  /**
   * @private
   * @type { MdOptionsMenu | null }
   */
  this._optionsMenu = null
  /**
   * @protected
   * @readonly
   */
  this._internals = this.attachInternals()
  this._internals.role = "select"
  addEventListener("load", this.muestraValue)
 }

 connectedCallback() {
  this.tabIndex = 0
  this.role = "combobox"
  this.ariaHasPopup = "listbox"
  this.ariaExpanded = "false"
  this["aria-controls"] = this.options
  this.addEventListener("keydown", this._onKeyDown)
  const parentElement = this.parentElement
  if (parentElement !== null) {
   parentElement.addEventListener("click", this._alterna)
  }
 }

 /**
  * @param {string} nombreDeAtributo
  * @param {string} _valorAnterior
  * @param {string} _nuevoValor
  */
 attributeChangedCallback(nombreDeAtributo, _valorAnterior, _nuevoValor) {
  switch (nombreDeAtributo) {
   case "options":
    this._cambiaOptions()
    break
   case "value":
    this.muestraValue()
    break
   case "required":
    this.checkValidity()
    break
  }
 }

 get options() {
  return getAttribute(this, "options")
 }

 set options(options) {
  this.setAttribute("options", options)
 }

 _cambiaOptions() {
  if (this._optionsMenu !== null) {
   this._optionsMenu = null
  }
  this["aria-controls"] = this.options
 }

 get required() {
  return this.hasAttribute("required")
 }

 set required(required) {
  this.toggleAttribute("required", Boolean(required))
 }

 get value() {
  return getAttribute(this, "value")
 }

 set value(value) {
  this.setAttribute("value", value)
 }

 get name() {
  return getAttribute(this, "name")
 }

 set name(name) {
  this.setAttribute("name", name)
 }

 muestraValue() {
  const value = this.value
  this._internals.setFormValue(value)

  // En un futuro se usará esto en vez de la clase populated.
  // if (value === "") {
  //  this._internals.states.delete("populated")
  // } else {
  //  this._internals.states.add("populated")
  // }

  if (this.isConnected) {
   if (value === "") {
    this.classList.remove("populated")
   } else {
    this.classList.add("populated")
   }
   this._checkValidity()
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    this.output.value = optionsMenu.muestraValue(value)
   }
  }
 }

 get form() {
  return this._internals && this._internals.form
 }

 get willValidate() {
  return this._internals ? this._internals.willValidate : true
 }

 /**
  * @param {string} message
  */
 setCustomValidity(message) {
  this._customValidity = message
  this._checkValidity()
 }

 /**
  * @returns {ValidityState}
  */
 get validity() {
  return this._internals.validity
 }

 checkValidity() {
  return this._internals.checkValidity()
 }

 reportValidity() {
  return this._internals.reportValidity()
 }

 get validationMessage() {
  return this._internals.validationMessage
 }
 /** @returns {boolean} */
 _checkValidity() {
  if (this._customValidity !== "") {
   this._internals.setValidity({ customError: true }, this._customValidity)
   return false
  } else if (this.required && this.value === "") {
   this._internals.setValidity({ valueMissing: true }, "Seleccione una opción.")
   return false
  } else {
   this._internals.setValidity({})
   return true
  }
 }

 /** @private */
 _alterna() {
  if (this.classList.contains("open")) {
   this._cierra()
  } else {
   this._abre()
  }
 }

 /** @private */
 _abre() {
  this.classList.add("open")
  const parentElement = this.parentElement
  if (parentElement !== null) {
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    optionsMenu.style.top = `${parentElement.offsetTop + 58}px`
    optionsMenu.style.left = `${parentElement.offsetLeft}px`
    optionsMenu.style.width = `${parentElement.offsetWidth}px`
    optionsMenu.abre()
    this.focus()
    optionsMenu.addEventListener("click", this._clicEnDialogo)
   }
   this.ariaExpanded = "true"
   document.addEventListener("click", this.clicExterno)
  }
 }

 /** @private */
 _cierra() {
  this.classList.remove("open")
  const optionsMenu = this.optionsMenu
  if (optionsMenu !== null) {
   optionsMenu.cierra()
   optionsMenu.removeEventListener("click", this._clicEnDialogo)
  }
  this.ariaExpanded = "false"
  document.removeEventListener("click", this.clicExterno)
  this.dispatchEvent(new Event("input", { bubbles: true }))
 }

 get optionsMenu() {
  if (this._optionsMenu === null) {
   if (this.options !== "") {
    const optionsMenu = document.getElementById(this.options)
    if (optionsMenu instanceof MdOptionsMenu) {
     this._optionsMenu = optionsMenu
    } else {
     throw new Error(`Valor incorrecto para options: "${this.options}".`)
    }
   }
  }
  return this._optionsMenu
 }

 /** @private */
 _avanzaOpcion() {
  const i = this._valueIndex
  if (i > -1) {
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    const opciones = optionsMenu.opciones
    if (i < opciones.length - 1) {
     this.value = getAttribute(opciones[i + 1], "data-value")
    }
   }
  }
 }

 /** @private */
 _retrocedeOpcion() {
  const i = this._valueIndex
  if (i > -1) {
   const optionsMenu = this.optionsMenu
   if (optionsMenu !== null) {
    const opciones = optionsMenu.opciones
    if (i > 0) {
     this.value = getAttribute(opciones[i - 1], "data-value")
    }
   }
  }
 }

 /**
  * @private
  * @returns {number}
  */
 get _valueIndex() {
  const value = this.value
  const optionsMenu = this.optionsMenu
  return (optionsMenu === null
   ? -1
   : optionsMenu.opciones.findIndex(opcion => opcion.dataset.value === value))
 }

 /**
  * @private
  * @param {Event} event
  */
 _clicEnDialogo(event) {
  const target = event.target
  const optionsMenu = this.optionsMenu
  let value = ""
  if (optionsMenu !== null) {
   for (const opcion of optionsMenu.opciones) {
    if (opcion === target) {
     opcion.classList.add("selected")
     value = getAttribute(opcion, "data-value")
    } else {
     opcion.classList.remove("selected")
    }
   }
  }
  this.value = value
  this._cierra()
  this.focus()
}

 /**
  * @param {Event} evt
  */
 clicExterno(evt) {
  const target = evt.target
  const parentElement = this.parentElement
  const optionsMenu = this._optionsMenu
  if (this.classList.contains("open")
   && target instanceof HTMLElement
   && parentElement !== null
   && !parentElement.contains(target)
   && optionsMenu !== null
   && !optionsMenu.contains(target)) {
   this._cierra()
  }
 }

 /**
  * @param { KeyboardEvent } event
  */
 _onKeyDown(event) {
  const key = event.key
  const optionsMenu = this._optionsMenu
  if (optionsMenu !== null) {
   if (optionsMenu.classList.contains("open")) {
    if (key === "ArrowDown") {
     event.preventDefault()
     this._avanzaOpcion()
    } else if (key === "ArrowUp") {
     event.preventDefault()
     this._retrocedeOpcion()
    } else if (key === "Escape") {
     event.preventDefault()
     this._cierra()
    } else if (key === " ") {
     event.preventDefault()
     this._cierra()
    } else if (key === "Tab") {
     this._cierra()
    } else {
     event.preventDefault()
    }
   } else if (key === " ") {
    event.preventDefault()
    this._abre()
   } else if (key === "Tab") {
    this._cierra()
   } else {
    event.preventDefault()
   }
  }
 }

}

MdSelectMenu.formAssociated = true

customElements.define("md-select-menu", MdSelectMenu)