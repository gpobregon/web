import React, {FC, useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'
import { PublishSite } from '../../../models/publishSite'
import { getData, getSitiosPublicados } from '../../../services/api'

const ResultMostVisited: FC<any> = ({show, data, site, name}) => { 
    console.log("name: ", name);
    console.log("data: ", data);
    console.log("site: ", site);
    
    return (
        <div style={show == false ? {display: 'none'} : {display: 'block'}}>
            <Row className='mb-7'>
                <div className='text-left'>
                    <h3 className='text-dark mt-0'>Resultados de la busqueda</h3>
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
                    <div className='d-flex align-items-center'>
                        <div
                            className='me-8'
                            style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#a9a9a9',
                                borderRadius: '50%',
                            }}
                        ></div>
                        <div>
                            <h2 className=''>{name}</h2>
                            <h6 className='text-muted'>{site.fecha_inicial} / {site.fecha_final}</h6>
                        </div>
                    </div>
                    <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                    <Table bordered responsive className='text-center' size="sm" striped>
                        <thead>
                            <tr>
                                <th>Visitas</th>
                                <th colSpan={3}>Género</th>
                                <th colSpan={3}>Edad</th>
                                <th colSpan={2}>País</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total de visitas</td>

                                <td>Hombre</td>
                                <td>Mujer</td>
                                <td>Indefinido</td>

                                <td>Menores de edad</td>
                                <td>Mayores de edad</td>
                                <td>Tercera edad</td>
                                
                                <td>Nacionales</td>
                                <td>Extranjeros</td>
                            </tr> 
                            {data?.map((item: any)=>( 
                                <tr>
                                <td>{data[0].total_visitas}</td>

                                <td>{data[0].genero.hombre}</td>
                                <td>{data[0].genero.mujer}</td>
                                <td>{data[0].genero.indefinido}</td>
                                
                                <td>{data[0].edad.menores}</td>
                                <td>{data[0].edad.mayores}</td>
                                <td>{data[0].edad.tercera_edad}</td>
                                
                                <td>{data[0].pais.nacional}</td>
                                <td>{data[0].pais.internacional}</td>
                            </tr>

                            ))}
                            
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ResultMostVisited
