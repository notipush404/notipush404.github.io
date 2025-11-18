export async function getSuscripcionPush() {
 // Recupera el service worker registrado.
 const registro = await navigator.serviceWorker.ready
 return registro.pushManager.getSubscription()
}