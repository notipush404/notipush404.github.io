import { ES_APPLE } from "../const/ES_APPLE.js"
import { getAttribute } from "../getAttribute.js"
import { querySelector } from "../querySelector.js"

class MdTopAppBar extends HTMLElement {

 getContent() {
  return /* HTML */`
   <style>

    :host {
     display: flex;
     box-sizing: border-box;
     align-items: center;
     padding: 0 0.25rem;
     background-color: var(--md-sys-color-surface);
     position: sticky;
     z-index: 1;
     left: env(titlebar-area-x, 0);
     top: env(titlebar-area-y, 0);
     height: env(titlebar-area-height, 4rem);
     width: env(titlebar-area-width, 100%);
    }
    
    :host(.apple) {
     height: env(titlebar-area-height, 3rem);
    }

    :host(.scroll) {
     background-color: var(--md-sys-color-surface-container-low);
    }

    #navigation {
     flex: 0 0 auto;
     overflow: hidden
    }

    #navigation ::slotted(*) {
     color: var(--md-sys-color-on-surface);
    }

    #acciones {
     margin-left: auto;
     flex: 0 0 auto;
     overflow: hidden
    }

    :host(.centrado) #acciones,
    :host(.center-aligned) #acciones {
     flex: 0 0 3rem;
     overflow: hidden
    }

    #headline::slotted(*) {
     -webkit-app-region: drag;
     flex: 1 1 auto;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
     font-family: var(--md-sys-typescale-title-large-font);
     font-weight: var(--md-sys-typescale-title-large-weight);
     font-size: var(--md-sys-typescale-title-large-size);
     font-style: var(--md-sys-typescale-title-large-font-style);
     letter-spacing: var(--md-sys-typescale-title-large-tracking);
     line-height: var(--md-sys-typescale-title-large-line-height);
     text-transform: var(--md-sys-typescale-title-large-text-transform);
     text-decoration: var(--md-sys-typescale-title-large-text-decoration);
     color: var(--md-sys-color-on-surface);
    }

    :host(.center-aligned) #headline::slotted(*) {
     flex: 1 1 auto;
     text-align: center
    }

   </style>

   <span id="navigation">
    <slot name="navigation"></slot>
   </span>
   <slot id="headline"></slot>
   <span id="acciones">
    <slot name="action"></slot>
   </span>`
 }

 constructor() {
  super()
  if (ES_APPLE) {
   document.body.classList.add("apple")
   document.body.classList.remove("material")
  } else {
   document.body.classList.add("material")
   document.body.classList.remove("apple")
  }

  /**
   * @private
   * @readonly
   */
  const shadow = this.attachShadow({ mode: "open" })
  shadow.innerHTML = this.getContent()
  this._configuraAction = this._configuraAction.bind(this)
  /**
   * @private
   * @type {number}
   */
  this._posY = 0
  /**
   * @private
   * @type {boolean}
   */
  this._scrolling = false
  /**
    * @private
    * @type { HTMLSlotElement }
    */
  this._navigation = querySelector(shadow, '[name="navigation"]')
  /**
    * @private
    * @type { HTMLSlotElement }
    */
  this._action = querySelector(shadow, '[name="action"]')
  /**
    * @private
    * @type { HTMLHeadingElement | null }
    */
  this._headline = null
  /**
    * @private
    * @type { HTMLElement | null }
    */
  this._adicional = null
  this._action.addEventListener("slotchange", this._configuraAction)
  addEventListener("scroll", () => this._onScroll())
  addEventListener("load", () => this.configurOtros())
 }

 connectedCallback() {
  this.role = "toolbar"
  this._configuraAction()
 }

 configurOtros() {
  const idHeadline = getAttribute(this, "headline")
  if (idHeadline !== "") {
   const headline = document.getElementById(idHeadline)
   if (headline instanceof HTMLHeadingElement) {
    this._headline = headline
    if (this.classList.contains("apple") || this.classList.contains("medium")) {
     headline.classList.add("md-headline", "headline-small")
    } else {
     headline.classList.add("md-headline", "headline-medium")
    }
   }
  }
  const idAdicional = getAttribute(this, "adicional")
  if (idAdicional !== "") {
   this._adicional = document.getElementById(idAdicional)
   if (this._adicional !== null) {
    if (this.classList.contains("apple")) {
     this._adicional.style.top = "env(titlebar-area-height, 3rem)"
    } else {
     this._adicional.style.top = "env(titlebar-area-height, 4rem)"
    }
   }
  }
 }

 _configuraAction() {
  const assignedElements = this._action.assignedElements()
  if (this.isConnected) {
   if (ES_APPLE) {
    this.classList.add("apple")
    this.classList.remove("material")
   } else {
    this.classList.add("material")
    this.classList.remove("apple")
   }
   if (this.classList.contains("center-aligned")) {
    this.classList.remove("centrado")
    this.classList.remove("justificado")
   } else {
    if (ES_APPLE && assignedElements.length <= 1) {
     this.classList.add("centrado")
     this.classList.remove("justificado")
    } else {
     this.classList.add("justificado")
     this.classList.remove("centrado")
    }
   }
  }
 }

 /** @private */
 _onScroll() {
  this._posY = scrollY
  if (!this._scrolling) {
   requestAnimationFrame(() => this._avanza())
  }
  this._scrolling = true
 }

 /** @private */
 _avanza() {
  if (this._posY === 0) {
   this.classList.remove("scroll")
   if (this._headline !== null) {
    if (this._adicional === null) {
     this._headline.classList.remove("scroll")
    } else {
     this._headline.classList.remove("scroll-adicional")
    }
   }
   if (this._adicional !== null) {
    this._adicional.classList.remove("scroll")
   }
  } else {
   this.classList.add("scroll")
   if (this._headline !== null) {
    if (this._adicional === null) {
     this._headline.classList.add("scroll")
    } else {
     this._headline.classList.add("scroll-adicional")
    }
   }
   if (this._adicional !== null) {
    this._adicional.classList.add("scroll")
   }
  }
  this._scrolling = false
 }

}

customElements.define("md-top-app-bar", MdTopAppBar)