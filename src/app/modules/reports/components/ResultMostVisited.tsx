import React from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'

const ResultMostVisited = () => {
    return (
        <>
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
                            <h2 className=''>Museo de Arte Moderno</h2>
                            <h6 className='text-muted'>17/07/2022 - 22/07/2022</h6>
                        </div>
                    </div>
                    <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                    ola
                </div>
            </div>
        </>
    )
}

export default ResultMostVisited
