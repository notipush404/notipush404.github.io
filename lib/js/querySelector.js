/**
 * @template { HTMLElement } T
 * @param { Document | Element | ShadowRoot } raiz
 * @param { string } query
 * @returns { T }
 */
export function querySelector(raiz, query) {
 /** @type { T | null } */
 const resutado = raiz.querySelector(query)
 if (resutado === null)
  throw new Error(`No se encuentra ${query}.`)
 return resutado
}