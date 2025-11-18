/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 * 
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 * 
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 * 
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "1.00"

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "PWAMD-404Team"

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
 "ayuda.html",
 "favicon.ico",
 "index.html",
 "site.webmanifest",
 "error/authtokenincorrecto.html",
 "error/contentencodingincorrecta.html",
 "error/datosnojson.html",
 "error/endpointincorrecto.html",
 "error/errorinterno.html",
 "error/publickeyincorrecta.html",
 "error/resultadonojson.html",
 "css/dark-hc.css",
 "css/dark-mc.css",
 "css/dark.css",
 "css/estilos.css",
 "css/light-hc.css",
 "css/light-mc.css",
 "css/light.css",
 "css/transicion_completa.css",
 "css/transicion_pestanas.css",
 "img/icono2048.png",
 "img/maskable_icon.png",
 "img/maskable_icon_x128.png",
 "img/maskable_icon_x192.png",
 "img/maskable_icon_x384.png",
 "img/maskable_icon_x48.png",
 "img/maskable_icon_x512.png",
 "img/maskable_icon_x72.png",
 "img/maskable_icon_x96.png",
 "img/screenshot_horizontal.png",
 "img/screenshot_vertical.png",
 "js/configura.js",
 "js/nav-bar.js",
 "js/nav-drw.js",
 "js/nav-tab-fixed.js",
 "js/nav-tab-scrollable.js",
 "js/registraServiceWorker.js",
 "lib/css/material-symbols-outlined.css",
 "lib/css/md-cards.css",
 "lib/css/md-fab-primary.css",
 "lib/css/md-filled-button.css",
 "lib/css/md-filled-text-field.css",
 "lib/css/md-list.css",
 "lib/css/md-menu.css",
 "lib/css/md-navigation-bar.css",
 "lib/css/md-outline-button.css",
 "lib/css/md-ripple.css",
 "lib/css/md-segmented-button.css",
 "lib/css/md-slider-field.css",
 "lib/css/md-standard-icon-button.css",
 "lib/css/md-switch.css",
 "lib/css/md-tab.css",
 "lib/css/md-top-app-bar.css",
 "lib/css/roboto.css",
 "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
 "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
 "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
 "lib/fonts/roboto-v32-latin-regular.woff2",
 "lib/js/abreElementoHtml.js",
 "lib/js/activaNotificacionesPush.js",
 "lib/js/calculaDtoParaSuscripcion.js",
 "lib/js/cancelaSuscripcionPush.js",
 "lib/js/cierraElementoHtmo.js",
 "lib/js/consumeJson.js",
 "lib/js/enviaJson.js",
 "lib/js/exportaAHtml.js",
 "lib/js/getAttribute.js",
 "lib/js/getSuscripcionPush.js",
 "lib/js/htmlentities.js",
 "lib/js/muestraError.js",
 "lib/js/muestraObjeto.js",
 "lib/js/muestraTextoDeAyuda.js",
 "lib/js/ProblemDetails.js",
 "lib/js/querySelector.js",
 "lib/js/resaltaSiEstasEn.js",
 "lib/js/submitForm.js",
 "lib/js/suscribeAPush.js",
 "lib/js/urlBase64ToUint8Array.js",
 "lib/js/const/ES_APPLE.js",
 "lib/js/custom/md-menu-button.js",
 "lib/js/custom/md-options-menu.js",
 "lib/js/custom/md-overflow-button.js",
 "lib/js/custom/md-overflow-menu.js",
 "lib/js/custom/md-select-menu.js",
 "lib/js/custom/md-slider-field.js",
 "lib/js/custom/md-top-app-bar.js",
 "lib/js/custom/MdNavigationDrawer.js",
 "material-tokens/css/baseline.css",
 "material-tokens/css/colors.css",
 "material-tokens/css/elevation.css",
 "material-tokens/css/motion.css",
 "material-tokens/css/palette.css",
 "material-tokens/css/shape.css",
 "material-tokens/css/state.css",
 "material-tokens/css/typography.css",
 "material-tokens/css/theme/dark.css",
 "material-tokens/css/theme/light.css",
 "ungap/custom-elements.js",
 "/"
]

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
 // Evento al empezar a instalar el servide worker,
 self.addEventListener("install",
  (/** @type {ExtendableEvent} */ evt) => {
   console.log("El service worker se está instalando.")
   evt.waitUntil(llenaElCache())
  })

 // Evento al solicitar información a la red.
 self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
  if (evt.request.method === "GET") {
   evt.respondWith(buscaLaRespuestaEnElCache(evt))
  }
 })

 // Evento cuando el service worker se vuelve activo.
 self.addEventListener("activate",
  () => console.log("El service worker está activo."))
}

async function llenaElCache() {
 console.log("Intentando cargar caché:", CACHE)
 // Borra todos los cachés.
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Abre el caché de este service worker.
 const cache = await caches.open(CACHE)
 // Carga el listado de ARCHIVOS.
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
 // Abre el caché.
 const cache = await caches.open(CACHE)
 const request = evt.request
 /* Busca la respuesta a la solicitud en el contenido del caché, sin
  * tomar en cuenta la parte después del símbolo "?" en la URL. */
 const response = await cache.match(request, { ignoreSearch: true })
 if (response === undefined) {
  /* Si no la encuentra, empieza a descargar de la red y devuelve
   * la promesa. */
  return fetch(request)
 } else {
  // Si la encuentra, devuelve la respuesta encontrada en el caché.
  return response
 }
}

const URL_SERVIDOR = "https://notipush404.xo.je/"

if (self instanceof ServiceWorkerGlobalScope) {

 // El siguiente código se activa cuando llega una notificación push.
 self.addEventListener("push", (/** @type {PushEvent} */ event) => {
  const notificacion = event.data
  /* Si el navegador tiene permitido mostrar notificaciones push,
   * nuestra la que se ha recibido. */
  if (notificacion !== null && self.Notification.permission === 'granted') {
   event.waitUntil(muestraNotificacion(notificacion))
  }
 })

 self.addEventListener("notificationclick",
  (/** @type {NotificationEvent} */ event) => {
   event.notification.close()
   event.waitUntil(muestraVentana())
  })
}

/**
 * @param {PushMessageData} notificacion
 */
async function muestraNotificacion(notificacion) {
 if (self instanceof ServiceWorkerGlobalScope) {
  const mensaje = notificacion.text()
  await self.registration.showNotification(mensaje)
 }
}

async function muestraVentana() {
 if (self instanceof ServiceWorkerGlobalScope) {
  const clientes = await self.clients.matchAll({ type: "window" })
  for (const cliente of clientes) {
   if (cliente.url.startsWith(URL_SERVIDOR)) {
    return cliente.focus()
   }
  }
  return self.clients.openWindow("/")
 }
}