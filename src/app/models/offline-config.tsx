export default interface OfflinePart{
  id_part:number,
  nombre:string,
  estado:number
}
export interface OfflineContentPart{
  id_part:number,
  id_type:number,
  nombre:string,
  checked:boolean,
  estado:number
}
export interface OfflinePartWithContent{
  id_part:number,
  nombre:string,
  estado:number,
  tipos_contenido:any[]
}
