import React, { FC } from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import { Site } from '../../../models/site';
import { getData, sitesMethod, deleteData } from '../../../services/api'
import  swal  from "sweetalert";
type sitio = {
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
  }
  
  

const Sitio: FC<sitio> = (props) => {
   
      const deleteSites = async () => {
        swal({
            title: "¿Estas seguro de Eliminar  "+props.nombre+"?",
            icon: "warning",
            buttons:["No","Sí"]
          }).then(res=>{
            if(res){
                deleteData(sitesMethod, props.id_sitio)
                swal({text:"Se elimino con éxito",
                icon:"success",
                timer:2000
            })
            window.location.reload(); 
            }
          });
      
    }
    return (
        <Col sm='6' md='3' className='pb-10'>
            <Card style={{ backgroundColor: '#1e1e2d', padding: 20 }}>

                <Card.Img variant='top' src={`https://picsum.photos/200/200?${props}`} className='mb-5' />

                <Card.Title style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden' }}>{props.nombre}</Card.Title>
                <Card.Text className='text-muted'>{props.ubicacion}</Card.Text>
                <div className='d-flex flex-row' style={{ justifyContent: 'space-between' }}>
                    <Button style={{ width: '48%' }}> 
                        <i className="bi bi-pencil-square"></i>
                        Editar
                    </Button>
                    <Button className='bg-secondary' style={{ width: '48%' }}  onClick={deleteSites}>
                        <i className="bi bi-trash3"></i>
                        Eliminar
                        
                        </Button>
                        
                </div>
            </Card>
           
        </Col >
    );
}

export default Sitio;
