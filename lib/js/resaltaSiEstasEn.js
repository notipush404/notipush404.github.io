import { querySelector } from "./querySelector.js"

/**
 * @param {string[]} paginas
 */
export function resaltaSiEstasEn(paginas) {

 const pathname = location.pathname

 for (const pagina of paginas) {

  if (pathname === pagina) {
   setTimeout(() => {
    const tab = document.querySelector(".active")
    if (tab !== null && tab.closest(".scrollable") !== null) {
     tab.scrollIntoView({ inline: "center", block: "end" })
    }
   })
   return `class="active"`
  }

 }

 return ""

}