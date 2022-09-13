import React, {FC, useEffect, useState} from "react";  
import {Link, useLocation} from 'react-router-dom' 
import { Button, Col, Form, Row, Table, Card } from 'react-bootstrap' 
import {initialQueryState, KTSVG, useDebounce} from '../../../_metronic/helpers'
import { getData, postData } from "../../services/api";
import { OfflinePartWithContent } from "../../models/offline-config";

const OfflineManagement: FC<any> = ({show}) =>{ 
    const { state } = useLocation()

    const [url_get] = useState('offline/part')
    const [url_edit_type] = useState('offline/part/content/update')
    let [listParts,setListParts] = useState<OfflinePartWithContent[]>([])
    let [arr,setArr] = useState<any[]>([])
    let [arrWithRows,setArrWithRows] = useState<any[]>([])
    const [partes,setPartes] = useState<any[]>([]);

    useEffect(() => {
        listParts=[]
        getOfflineParts()
        
        // console.log(listParts);
    }, [listParts]);
    async function getOfflineParts() {
        listParts=[];
        arr=[]  
        arrWithRows=[];
        const parts: any = await getData(url_get)
        // console.log(parts);
        
        var p = parts.map((cat: any) => {
            let contenidos = []
            for(var i=0;i<cat.tipos_contenido.length;i++){
                contenidos.push({
                    id_type:cat.tipos_contenido[i].id_type,
                    nombre:cat.tipos_contenido[i].nombre,
                    checked:cat.tipos_contenido[i].checked,
                    estado:cat.tipos_contenido[i].estado
                })

            }
            listParts.push(
                { 
                    id_part:cat.id_part,
                    nombre:cat.nombre,
                    estado:cat.estado,
                    tipos_contenido:contenidos
                }
            )
        })
        listParts.map((m:OfflinePartWithContent,index)=>{
                
            let el = <div key={index} id={m.id_part.toString()} className='d-flex align-items-center position-relative' style={{ width: '100%', justifyContent: 'space-between',marginTop:'10px',marginBottom:'10px' }}  >
                    <h2>{m.nombre}</h2>  
                </div> ;
            arr.push(el)
            
            m.tipos_contenido.map((t:any)=>{
                let x = <Col md={3} sm={12} lg={3}> 
                        <Form.Check
                            key={t.id_type}
                            style={{marginTop:'10px',marginBottom:'10px',marginRight:'0px'}}
                            inline
                            id={t.id_type}
                            label={t.nombre}
                            checked={t.checked}
                            onChange={(async (e:any)=>{
                                e.target.checked=!e.target.checked
                                // for(var i=0;i<listParts.length;i++){
                                //     for(var j=0;j<listParts.at(i)!.tipos_contenido.length;j++){
                                //         console.log("C");
                                //         if(listParts.at(i)!.tipos_contenido.at(j)!.id_type==Number(e.target.id)){
                                //             listParts.at(i)!.tipos_contenido.at(j)!.checked = !listParts.at(i)!.tipos_contenido.at(j)!.checked
                                var indexType = m.tipos_contenido.findIndex(b=>b.id_type==e.target.id)
                                var indexPart = listParts.findIndex(b=>b.id_part==m.id_part)
                                var x2 = m.tipos_contenido.at(indexType)
                                // console.log(x);
                                // console.log(x2);
                                listParts.at(indexPart)!.tipos_contenido.at(indexType)!.checked = !listParts.at(indexPart)!.tipos_contenido.at(indexType)!.checked
                                
                                
                                            await   postData(url_edit_type,{
                                                "id_part":-1,
                                                "id_type":x2.id_type,
                                                "nombre":x2.nombre,
                                                "checked":x2.checked,
                                                "estado":x2.estado
                                                
                                            })
                                            setListParts(listParts)
                                    //     }
    
                                    // }
                                    
                                // }
                                
                            })}
                            name="group1"
                        // type={type}
                        />
                        
                </Col> 
                arr.push(x)
                // console.log("ADADSDAS");
        
                // console.log(arr);               
            })
            arrWithRows.push(arr[0])
            for(var i =1;i<arr.length;i=i+3){
                let x = <Row>{arr[i]}{arr[i+1]}{arr[i+2]}</Row>
                arrWithRows.push(x)
            }
            arr = []
            }
        )
//        setArr(arr)
        setArrWithRows(arrWithRows)

    }

    return(  
        <> 
            <div
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px', 
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <div className='d-flex align-items-center'>
                        
                        <h1 className='m-0'>Gestor Offline</h1>
                    </div>
                </div>
            </div> 

            <Row className='mt-12 mb-9'>
                    <div className='text-left'>
                        <h2 className='text mb-0'>Configuración de Contenido Descargable</h2>
                    </div> 
            </Row> 

            <div
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'> 
                    <Row> 
                        <Col md={4} sm={4}>
                            
                            <h1>Ítems disponibles fuera de línea</h1> 
                            <p className="text-muted" >En este apartado puede seleccionar el contenido que el usuario podrá descargar en su aplicación tanto para sitios como para puntos de interés de un sitio.</p> 
             
                        </Col> 

                        <Col md={8} sm={8}> 
                        <div className='d-flex align-items-center position-relative' style={{ width: '100%', justifyContent: 'space-between' }}  >
                                <h1>Contenido Descargable</h1>  
                            </div> 
                            <div style={{paddingLeft:'10px'}}>
                                {arrWithRows.map(e=>{
                                    return e
                                })}
                            </div>

                            


                        </Col> 
                    </Row> 

                    
                </div> 
                
            </div>

        </>

    )
} 

export default OfflineManagement;