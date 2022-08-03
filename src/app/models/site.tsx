export interface Site {
  count: number,
  pages:number,
  page:number,
  sites:number,
  site:
    {
      id_sitio:number,
      nombre:string,
      descripcion:string,
      ubicacion:string,
      geoX:string,
      geoY:string,
      portada_path:string,
      estado:number,
      creado:string,
      editado:string,
      categorias:{
        id_categoria:number,
        nombre:string,
        estado:number,
      }[];
      id_municipio:number,
    }[];
  

}
