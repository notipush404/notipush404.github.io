import { querySelector } from "../querySelector.js"

export class MdSliderField extends HTMLElement {

 getContent() {
  return /* HTML */`
   <style>
    :host {
     display: block;
     margin: 1rem;
    }

    :host([hidden]) {
     display: none;
    }

    #label::slotted(*) {
     display: block;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
     color: var(--md-sys-color-on-surface-variant);
     font-family: var(--md-sys-typescale-body-small-font);
     font-weight: var(--md-sys-typescale-body-small-weight);
     font-size: var(--md-sys-typescale-body-small-size);
     font-style: var(--md-sys-typescale-body-small-font-style);
     letter-spacing: var(--md-sys-typescale-body-small-tracking);
     line-height: var(--md-sys-typescale-body-small-line-height);
     text-transform: var(--md-sys-typescale-body-small-text-transform);
     text-decoration: var(--md-sys-typescale-body-small-text-decoration);
    }

    [name="slider"]::slotted(input) {
     -webkit-appearance: none;
     appearance: none;
     height: 0.25rem;
     border-radius: 0.125rem;
     background-image:
      linear-gradient(to right, var(--md-sys-color-primary) 0%, var(--md-sys-color-primary) 50%, var(--md-sys-color-surface-container-highest) 50%, var(--md-sys-color-surface-container-highest) 100%);
    }

    [name="slider"]::slotted(input:focus) {
     outline: none;
    }

    [name="supporting"]::slotted(*) {
     display: block;
     color: var(--md-sys-color-on-surface-variant);
     font-family: var(--md-sys-typescale-body-small-font);
     font-weight: var(--md-sys-typescale-body-small-weight);
     font-size: var(--md-sys-typescale-body-small-size);
     font-style: var(--md-sys-typescale-body-small-font-style);
     letter-spacing: var(--md-sys-typescale-body-small-tracking);
     line-height: var(--md-sys-typescale-body-small-line-height);
     text-transform: var(--md-sys-typescale-body-small-text-transform);
     text-decoration: var(--md-sys-typescale-body-small-text-decoration);
     padding-top: 0.5rem;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
    }
   </style>
   <slot id="label"></slot>
   <slot name="slider"></slot>
   <slot name="supporting"></slot>`
 }

 constructor() {
  super()
  const shadow = this.attachShadow({ mode: "open", delegatesFocus: true })
  shadow.innerHTML = this.getContent()
  this._configuraSlider = this._configuraSlider.bind(this)
  this.analiza = this.analiza.bind(this)

  /**
  * @private
  * @type {HTMLSlotElement}
  */
  this._slotSlider = querySelector(shadow, '[name="slider"]')
  /**
   * @private
   * @type {HTMLInputElement|null}
   */
  this._input = null
  this._slotSlider.addEventListener("slotchange", this._configuraSlider)
 }

 /** @private */
 _configuraSlider() {
  if (this._input !== null) {
   this._input.removeEventListener("input", this.analiza)
   this._input = null
  }
  for (const input of this._slotSlider.assignedElements()) {
   if (input instanceof HTMLInputElement) {
    this._input = input
    input.addEventListener("input", this.analiza)
    this.analiza()
   }
  }
 }

 analiza() {
  const i = this._input
  if (i !== null) {
   const v = i.valueAsNumber
   const min = parseFloat(i.min)
   const max = parseFloat(i.max)
   const value = (v - min) / (max - min) * 100
   i.title = v.toString()
   i.style.background =
    `linear-gradient(to right, var(--md-sys-color-primary) 0%, var(--md-sys-color-primary) ${value
    }%, var(--md-sys-color-surface-container-highest) ${value
    }%, var(--md-sys-color-surface-container-highest) 100%)`
  }
 }

}

customElements.define("md-slider-field", MdSliderField)