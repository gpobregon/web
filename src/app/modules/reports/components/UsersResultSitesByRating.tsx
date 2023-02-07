import moment from 'moment'
import React, {FC} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'

const ResultSitesByRating: FC<any> = ({show, users}) => {
    return (
        <>
            <div className='pt-10' style={show == false ? {display: 'none'} : {display: 'block'}}>
                <div
                    className=''
                    style={{
                        backgroundColor: '#1E1E2D',
                        borderRadius: '5px',
                    }}
                >
                    <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                        <Table striped bordered hover variant='dark' className='align-middle'>
                            <thead>
                                <tr>
                                    {users[0]?.nombre_sitio && <th>Nombre del sitio</th>}
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Genero</th>
                                    <th>País</th>
                                    <th>Puntuación</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((item: any) => (
                                    <tr>
                                        {users[0]?.nombre_sitio && (
                                            <td className='text-muted'>{item.nombre_sitio}</td>
                                        )}
                                        <td className='text-muted'>{item.nombre}</td>
                                        <td className='text-muted'>{item.nombre}</td>
                                        <td className='text-muted'>{item.apellido}</td>
                                        <td className='text-muted'>{item.genero}</td>
                                        <td className='text-muted'>{item.pais_origen}</td>
                                        <td className='text-muted'>{item.puntuacion}</td>
                                        <td className='text-muted'>{item.comentario}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultSitesByRating
