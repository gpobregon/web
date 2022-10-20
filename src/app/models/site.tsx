import { Category } from "./category"

export interface Site {
  id_sitio: number
  nombre: string
  descripcion: string
  ubicacion: string
  geoX: string
  geoY: string
  portada_path: string
  estado: number
  creado: Date
  editado: Date
  categorias: [
    {
      id_categoria: number
      nombre: string
      estado: number
    }
  ]
  id_municipio: number
  favorito: boolean
  publicado: boolean
  oculto: boolean
  geo_json: string
  cercania_activa: boolean 
  nombre_usuario_edito: string
  qr_path: string
}

