import { getSuscripcionPush } from "./getSuscripcionPush.js"

export async function cancelaSuscripcionPush() {
 const suscripcion = await getSuscripcionPush()
 const resultado = suscripcion === null
  ? false
  : await suscripcion.unsubscribe()
 return resultado === true ? suscripcion : null
}