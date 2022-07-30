import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Sitio from './components/sitio';

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
            },
            {
                id: 8,
                titulo: 'Chocomuseo',
                ubicacion: 'Ubicacion'
            }
        ]
    });

    return (
        <Container fluid>
            <Row>
                <div className='text-left mb-10' >
                    <h1 className='text-dark mb-3'>Gestor de sitios</h1>
                </div>
            </Row>
            <Row className='pb-10'>
                <div>
                    <Button variant="primary">
                        {'Nuevo sitio'}
                    </Button>
                </div>
            </Row>
            <Row>
                {
                    state.data.map(sitio => <Sitio {...sitio} key={sitio.id.toString()} />)
                }
            </Row>
        </Container>
    );
}

export default SitiosPage;