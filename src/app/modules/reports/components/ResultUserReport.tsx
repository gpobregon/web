import React, {FC, useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import Select from 'react-select/dist/declarations/src/Select'
import {
    getData,
    getDataReport,
    getSitiosPublicados,
    getValue,
    postData,
} from '../../../services/api'
import Moment from 'moment'
import {PublishSite} from '../../../models/publishSite'

const ResultUserReport: FC<any> = ({show, data, site, name, photo}) => {
    return (
        <div style={show == false ? {display: 'none'} : {display: 'block'}}>
            <Row className='mb-7'>
                <div className='text-left' style={{paddingTop: 20}}>
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
                        >
                            <img
                                src={photo}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                        <div>
                            <h2 className=''>{name}</h2>
                            <h6 className='text-muted'>
                            {Moment(site.fecha_inicial).format('DD/MM/YYYY')} - {Moment(site.fecha_final).format('DD/MM/YYYY')}
                            </h6>
                        </div>
                    </div>
                    <hr style={{border: '1px solid rgba(255 255 255)', color: '#FFF'}} />
                </div>

                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <Table striped bordered hover variant='dark' className='align-middle'>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Usuario</th>
                                <th>Ultima visita</th>
                                <th>País</th>
                                <th>Genero</th>
                                <th>Edad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item: any ) => (
                                <tr key={item}>
                                    <td>
                                        <div
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: '#a9a9a9',
                                                borderRadius: '50%',
                                            }}
                                        ></div>
                                    </td>
                                    <td>
                                        <div>{item?.nombre}</div>
                                    </td>
                                    <td className='text-muted'>
                                        {Moment(item?.ultima_visita).format('DD/MM/YYYY')}
                                    </td>
                                    <td className='text-muted'>{item?.pais}</td>
                                    <td className='text-muted'>{item?.genero}</td>
                                    <td className='text-muted'>{item?.edad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ResultUserReport
