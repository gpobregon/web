export interface Notification {
    id_notificacion: number
    nombre: string
    descripcion: string
    imagen_path: string
    fecha_hora_programada: Date
    tipo: number
    estado: number
    id_sitio: number
}
