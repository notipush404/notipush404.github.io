/**
 * @param {HTMLElement} elementoHtml
 * @param {string} nombre
 * @returns {string}
 */
export function getAttribute(elementoHtml, nombre) {
 const valor = elementoHtml.getAttribute(nombre)
 return valor === null ? "" : valor
}