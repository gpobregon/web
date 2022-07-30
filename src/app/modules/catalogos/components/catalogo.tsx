import React, { FC } from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Catalogo: FC<any> = ({ data, onClick }) => {

    return (
        <Col sm='4' md='2' className='pb-10'>
            <Card style={{ display: 'flex', padding: 20, alignItems: 'center', height: 150, justifyContent: 'space-between' }}>
                <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className='menu-ico'>
                        <i className={`bi-${data.icono} text-white`} style={{ fontSize: 30 }}></i>
                    </span>
                </Card.Title>
                <Card.Subtitle className='text-muted'>{data.nombre}</Card.Subtitle>
                <span className='menu-ico' style={{ cursor: 'pointer' }} onClick={onClick}>
                    <i className={`bi-three-dots text-muted`} style={{ fontSize: 20 }}></i>
                </span>
            </Card>
        </Col>
    );
}

export default Catalogo;