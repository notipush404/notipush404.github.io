/**
 * @param { Uint8Array } applicationServerKey
 */
export async function suscribeAPush(applicationServerKey) {
 // Recupera el service worker registrado.
 const registro = await navigator.serviceWorker.ready
 return registro.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey
 })
}