import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';

import Catalogo from './components/catalogo';
import UpdateCatalogo from './components/update-catalogo';

const CatalogosPage = () => {

    const [updateModal, setUpdateModal] = useState({ show: false, catalogo: {} });
    const [state, setState] = useState({
        data: [
            {
                id: 1,
                nombre: 'Parque',
                icono: 'tree'
            },
            {
                id: 2,
                nombre: 'Edificio',
                icono: 'building'
            },
            {
                id: 3,
                nombre: 'Car',
                icono: 'car-front'
            },
            {
                id: 4,
                nombre: 'Avion',
                icono: 'airplane'
            },
            {
                id: 5,
                nombre: 'Tecnologia',
                icono: 'apple'
            },
            {
                id: 6,
                nombre: 'Museo',
                icono: 'bank'
            },
            {
                id: 7,
                nombre: 'Libro',
                icono: 'book'
            },
            {
                id: 8,
                nombre: 'Radio',
                icono: 'boombox'
            }
        ]
    });

    const onClick = (catalogo: any) => {
        setUpdateModal({ show: true, catalogo });
    }

    useEffect(() => {
        console.log(state.data);
    }, []);

    return (
        <Container fluid>
            <Row>
                <div className='text-left mb-10' >
                    <h1 className='text-dark mb-3'>Catalogos</h1>
                </div>
            </Row>
            <Row className='pb-10'>
                <div>
                    <Button variant="primary">
                        <span className='menu-icon me-0'>
                            <i className={`bi-tag fs-2`}></i>
                        </span>
                        {' Nueva categoria'}
                    </Button>
                </div>
            </Row>
            <Row>
                {
                    state.data.map(catalogo => <Catalogo key={catalogo.id.toString()} data={catalogo} onClick={() => onClick(catalogo)} />)
                }
            </Row>

            <UpdateCatalogo show={updateModal.show} catalogo={updateModal.catalogo} onClose={() => setUpdateModal({ show: false, catalogo: {} })} />
        </Container>
    );
}

export default CatalogosPage;