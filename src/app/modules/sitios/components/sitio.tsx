import React, { FC } from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import { Site } from '../../../models/site';
import { getData, sitesMethod, deleteData } from '../../../services/api'
import  swal  from "sweetalert";
import SitiosPage from '../SitiosPage';
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
            buttons:["No","Sí"],
            
          }).then(res=>{
            if(res){
                deleteData(sitesMethod, props.id_sitio)
                swal({text:"Se elimino con éxito",
                icon:"success",
                timer:2000,
                
            })
            window.location.reload(); //reload page

            }
          });
      
    }
    return (
      <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <Card style={{ backgroundColor: '#1e1e2d', padding: 20,margin:'20px', width: '95%', height: '395px' }}>

                <Card.Img variant='top' src={`https://picsum.photos/200/200?${props}`} className='mb-5 'style={{ maxHeight:'70%' }} />

                <Card.Title style={{  }}>{props.nombre}</Card.Title>
                <Card.Text className='text-muted'>{props.ubicacion}</Card.Text>
                <div className='d-flex flex-row' style={{ justifyContent: 'space-between' }}>
                    <Button style={{ width: '50%' }}> 
                        <i className="bi bi-pencil-square"></i>
                        Editar
                    </Button>
                    <Button className='bg-secondary' style={{ width: '50%' }}  onClick={deleteSites}>
                        <i className="bi bi-trash3"></i>
                        Eliminar
                        
                        </Button>
                        
                </div>
                <br></br>
                <br></br>
            </Card>
           
        </div >
    );
}

export default Sitio;
