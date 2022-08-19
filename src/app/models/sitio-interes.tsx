export interface PointInteres {
    id_punto: number  //TODO: change to number
    id_sitio: number  //TODO: change to number
    descripcion: string
    lenguajes: [
      {
        id_punto: number
        id_lenguaje: number
        descripcion: string
      }
    ]
    estado: string
    portada_path:string
    qr_path:string
    geoX:string
    geoY:string
    es_portada_de_sitio:boolean
    nombre:string
    es_visible:boolean
  }
  