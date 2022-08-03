import React, { FC } from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';

type sitio = {
    id: number,
    titulo: string,
    ubicacion: string
}

const Sitio: FC<sitio> = (props) => {

    return (
        <Col sm='6' md='3' className='pb-10'>
            <Card style={{ backgroundColor: '#1e1e2d', padding: 20 }}>

                <Card.Img variant='top' src={`https://picsum.photos/200/200?${props.id}`} className='mb-5' />

                <Card.Title style={{ whiteSpace: 'nowrap', textOverflow: ' ellipsis', overflow: 'hidden' }}>{props.titulo}</Card.Title>
                <Card.Text className='text-muted'>{props.ubicacion}</Card.Text>
                <div className='d-flex flex-row' style={{ justifyContent: 'space-between' }}>
                    <Button style={{ width: '48%' }}> 
                        <i className="bi bi-pencil-square"></i>
                        Editar
                    </Button>
                    <Button className='bg-secondary' style={{ width: '48%' }}>
                        <i className="bi bi-trash3"></i>
                        Eliminar
                        </Button>
                </div>
            </Card>
           
        </Col >
    );
}

export default Sitio;
