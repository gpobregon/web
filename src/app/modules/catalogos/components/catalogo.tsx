import React, {FC} from 'react'
import {Col, Card, Button} from 'react-bootstrap'

const Catalogo: FC<any> = ({data, showModal}) => {
    return (
        <Col sm='4' md='2' className='mb-6'>
            <Card
                style={{
                    display: 'flex',
                    padding: 20,
                    alignItems: 'center',
                    textAlign: 'center',
                    height: 175,
                    justifyContent: 'space-between',
                }}
            >
                <Card.Title
                    className='mb-4'
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                >
                    <span className='menu-ico'>
                        <i className={`bi-${data.icono} text-white`} style={{fontSize: 30}}></i>
                    </span>
                </Card.Title>
                <Card.Subtitle className='text-muted mb-4'>{data.nombre}</Card.Subtitle>
                <Card.Subtitle className='text-muted'>{data.idioma.nombre}</Card.Subtitle>
                <span className='menu-ico mt-auto' style={{cursor: 'pointer'}} onClick={showModal}>
                    <i className={`bi-three-dots text-muted`} style={{fontSize: 20}}></i>
                </span>
            </Card>
        </Col>
    )
}

export default Catalogo