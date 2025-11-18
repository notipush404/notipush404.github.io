/**
 * @param { string | URL } urlDeServiceWorkerQueRecibeNotificaciones
 */
export async function activaNotificacionesPush(

 urlDeServiceWorkerQueRecibeNotificaciones) {

 // Valida que el navegador soporte notificaciones push.
 if (!('PushManager' in window))
  throw new Error("Este navegador no soporta notificaciones push.")

 // Valida que el navegador soporte notificaciones,
 if (!("Notification" in window))
  throw new Error("Este navegador no soporta notificaciones push.")

 // Valida que el navegador soporte service workers,
 if (!("serviceWorker" in navigator))
  throw new Error("Este navegador no soporta service workers.")

 // Recupera el permiso para usar notificaciones
 let permiso = Notification.permission
 if (permiso === "default") {
  // Permiso no asignado. Pide al usuario su autorización.
  permiso = await Notification.requestPermission()
 }

 // Valida que el usuario haya permitido usar notificaciones..
 if (permiso === "denied")
  throw new Error("Notificaciones bloqueadas.")

 const registro = await navigator.serviceWorker.register(
  urlDeServiceWorkerQueRecibeNotificaciones)
 console.log(urlDeServiceWorkerQueRecibeNotificaciones, "registrado.")
 console.log(registro)

 if (!("showNotification" in registro))
  throw new Error("Este navegador no soporta notificaciones.")
}