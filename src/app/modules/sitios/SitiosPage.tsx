import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button,Card } from 'react-bootstrap';
import {getData, sitesMethod, deleteData} from '../../services/api'
import Sitio from './components/sitio';
import { Site } from "../../models/site";


const SitiosPage = () => {
    const [state, setState] = useState({
        data: [
            {
                id: 1,
                titulo: 'Museo del ferrocaril',
                ubicacion: 'Ubicacion'
            },
            {
                id: 2,
                titulo: 'Museo de Ciencia Natural',
                ubicacion: 'Ubicacion'
            },
            {
                id: 3,
                titulo: 'Museo de Arte Moderno',
                ubicacion: 'Ubicacion'
            },
            {
                id: 4,
                titulo: 'Chocomuseo',
                ubicacion: 'Ubicacion'
            },
            {
                id: 5,
                titulo: 'Museo del ferrocaril',
                ubicacion: 'Ubicacion'
            },
            {
                id: 6,
                titulo: 'Museo de Ciencia Natural',
                ubicacion: 'Ubicacion'
            },
            {
                id: 7,
                titulo: 'Museo de Arte Moderno',
                ubicacion: 'Ubicacion'
             }//,
            // {
            //     id: 8,
            //     titulo: 'Chocomuseo',
            //     ubicacion: 'Ubicacion'
            // }
        ]
    });
    useEffect(() => {
        getSites();
       
    },[])


    const getSites = async () => {
        const site: any = await getData(sitesMethod)
        console.log(site)
    
        // setFilterSites(site.site as Site[])
        // setSites(site.site as Site[])
      }
    

    return (
        
        <Container fluid>
            <Row className='pb-10'>
                
                <Col xs={6} md={4}><h1>Gestor de sitios</h1></Col>
                <Col xs={6} md={4}>
                <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar"/>
                </Col>
            </Row>
          
           
            <Row className='pb-10'>  
            <Col md={4} className='pb-10'>
                    <a className="navbar-brand" href="#">Agregado recientemente</a>     
               </Col> 
               <Col md={{ span: 2, offset: 6 }} >
                    <Button className="btn btn-primary">
                        <i className="bi bi-file-earmark-plus"></i>
                        {'Nuevo sitio'}
                    </Button>
               </Col>  
            </Row>
            <Row>
                {
                    state.data.map(sitio => <Sitio {...sitio} key={sitio.id.toString()} />)
                }
                 <Col sm='6' md='3' className='pb-10'>
                    <Card style={{ backgroundColor: '#1e1e2d', padding: 20 , width:'305px',height:'395px',display:'table'}}>          
                        <a href="sitios/create" style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', display:'table-cell',verticalAlign:'middle',textAlign:'center'}}>
                            <svg 
                           
                            xmlns="http://www.w3.org/2000/svg" width="
33.33px" height="
41.67px"  fill="white" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                            </svg>
                            <Card.Text style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden'}} >Nuevo Sitio</Card.Text>
               
                        </a>
                     
                    </Card>
                
                </Col >          
            </Row>
        </Container>
    );
}

export default SitiosPage;