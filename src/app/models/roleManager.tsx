export interface roleManager {
    id_rol: number
    nombre: string
    descripcion: string

    idioma_crear: boolean
    idioma_editar: boolean
    idioma_eliminar: boolean

    categoria_crear: boolean
    categoria_editar: boolean
    categoria_eliminar: boolean

    sitio_crear: boolean
    sitio_editar: boolean
    sitio_eliminar: boolean
    sitio_favorito: boolean
    sitio_publicar: boolean
    sitio_visible: boolean
    sitio_maquetar: boolean
    sitio_sala_crear: boolean
    sitio_establecer_imagen_principal: boolean

    sitio_punto_crear: boolean
    sitio_punto_editar: boolean
    sitio_punto_eliminar: boolean
    sitio_punto_ordenar: boolean
    sitio_punto_visible: boolean
    sitio_punto_publicar: boolean
    sitio_punto_maquetar: boolean

    sitio_punto_ruta_crear: boolean
    sitio_punto_ruta_editar: boolean
    sitio_punto_ruta_eliminar: boolean
    sitio_punto_ruta_pasos_crear: boolean
    sitio_punto_ruta_pasos_editar: boolean
    sitio_punto_ruta_pasos_eliminar: boolean
    sitio_punto_ruta_imagen_crear: boolean
    sitio_punto_ruta_imagen_editar: boolean
    sitio_punto_ruta_imagen_eliminar: boolean
    sitio_punto_ruta_mapa_crear: boolean
    sitio_punto_ruta_mapa_editar: boolean
    sitio_punto_ruta_mapa_eliminar: boolean

    notificacion_crear: boolean
    notificacion_programada_editar: boolean
    notificacion_programada_eliminar: boolean
    notificacion_historial_editar: boolean
    notificacion_historial_eliminar: boolean

    offline_sitios: boolean
    offline_puntos: boolean

    reportes: boolean

    usuarios_crear: boolean
    usuarios_editar: boolean
    usuarios_eliminar: boolean
    usuarios_buscar: boolean

    rol_crear: boolean
    rol_editar: boolean
    rol_eliminar: boolean

    gestor_sitios: boolean
    gestor_notificaciones: boolean
    gestor_puntos_de_interes: boolean
    gestor_reportes: boolean
    gestor_usuarios: boolean
    gestor_offline: boolean
    gestor_roles: boolean
    gestor_categorias_idiomas: boolean

    estado: number
}
