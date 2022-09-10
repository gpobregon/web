export interface roleManager{ 
    nombre: string,
    descripcion: string,
    gestor_sitios: boolean,
    gestor_notificaciones: boolean,
    gestor_puntos_de_interes: boolean,
    gestor_reportes: boolean,
    gestor_usuarios: boolean,
    gestor_offline: boolean,
    gestor_roles: boolean,
    gestor_categorias_idiomas: boolean,
    estado: number
}