import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { getData, sitesMethod, deleteData } from '../../services/api'
import Sitio from './components/sitio';
import { Site } from "../../models/site";
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import moment from 'moment';

const SitiosPage = () => {
    const [sites, setSites] = useState<Site[]>([])
    const [busqueda, setBusqueda] = useState('')
    const [filterSites, setFilterSites] = useState<Site[]>([])
    const [estado, setEstado] = useState(true)
    const [up, setUp] = useState(true)
    useEffect(() => {
        getSites();

    }, [])
    const search = (search: string) => {
        if (!search) {
          setFilterSites(sites)
        } else {
          setFilterSites(
            sites.filter((elemento: Site) =>
              elemento.nombre.toLowerCase().includes(search.toLocaleLowerCase())
               
            )
           
          )
          console.log(filterSites)
        }
      }

    const handlerChange = (e: {target: {value: string}}) => {
        setBusqueda(e.target.value)
        search(e.target.value)
      }

    const getSites = async () => {
        const site: any = await getData(sitesMethod)
        console.log(site)
        setFilterSites(site.site as Site[])
        setSites(site.site as Site[])
    }

    const ordernarAsc = () => {
        const numAscending = [...sites].sort((a, b) =>  moment(a.creado).diff(b.creado))
        setSites(numAscending)
        setFilterSites(numAscending)
        console.log(numAscending)
        setEstado(false)
        setUp(false)
      }
    
      const ordenarDesc = () => {
        const numDescending = [...sites].sort((a, b) => moment(b.creado).diff(a.creado))
        setSites(numDescending)
        setFilterSites(numDescending)
        console.log(numDescending)
        setEstado(true)
        setUp(true)
      }
    return (

        <Container fluid>
            <div className='col-xs-12'>
                <div
                    className=' card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover '
                    style={{
                        backgroundColor: '#1A1A27',
                        backgroundSize: 'auto 100%',
                    }}
                >
                    <div className='col-xs-12 col-md-12 col-lg-12 row align-items-start'>
                        <div className='col-md-4 '>
                            <h3 className='letterTitle'>
                                Gestor de Sitios <span className='lettersmall'>| 272 en total</span>
                            </h3>
                        </div>

                        <div className='col-md-5 col-xs-12 searchDash'>
                            <div className='d-flex align-items-center position-relative me-2'>

                                <input
                                    type='text'
                                    id='kt_filter_search'
                                    className='form-control form-control-white form-control-sm w-155px ps-9 inputBuscar'
                                    placeholder='Search'
                                    value={busqueda}
                                    onChange={handlerChange}
                                />

                            </div>
                        </div>

                        <div className='col-md-3 col-xs-2'>
                            <ul className='pagination'>
                                <li className='page-item previous disabled'>
                                    <a href='#' className='page-link'>
                                        <i className='previous'></i>
                                    </a>
                                </li>
                                <li className='page-item'>
                                    <a href='#' className='page-link'>
                                        1
                                    </a>
                                </li>
                                <span className='letra'>de</span>
                                <li className='page-item letra1'>
                                    <a href='#' className='page-link'>
                                        22
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

            <br></br>
            <br></br>
            <Row className='pb-10'>
                <Col md={4} className='pb-10'>
                
              <span
                className={up == false ? 'bi bi-sort-down' : 'bi bi-sort-up'}
                onClick={estado == true ? ordernarAsc : ordenarDesc}
              >
                Agregados recientemente
              </span>
            
                </Col>
                <Col md={{ span: 2, offset: 6 }} >
                <Link to={'create'}>
                    <Button className="btn btn-primary" >
                    
                    <i className="bi bi-file-earmark-plus"></i>
                    {'Nuevo sitio'}
                    
                        
                    </Button>
                    </Link>
                </Col>
            </Row>
            <div className='row g-4'>
          
                {
                    filterSites?.map(sitio => <Sitio {...sitio} key={sitio.id_sitio.toString() }  />)
                    
                }
                
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <Card  style={{ backgroundColor: '#1e1e2d',margin:'20px', padding: 20, width: '95%', height: '420px', display: 'table' }}>
                    <Link to={'create'} style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden', display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}>
                     
                            <svg

                                xmlns="http://www.w3.org/2000/svg" width="
                                33.33px" height="
                                41.67px"  fill="white" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                            </svg>
                            <Card.Text style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden' }} >Nuevo Sitio</Card.Text>

                  
                        </Link>
                    </Card>
                    </div>
                
                  
                    </div>
                   
               
        </Container>
    );
}

export default SitiosPage;