import React, { useState, FC } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const UpdateCatalogo: FC<any> = ({ show, catalogo, onClose }) => {
    const [state, setState] = useState({
        id: catalogo?.id ?? 0,
        nombre: catalogo?.nombre ?? '',
        icono: catalogo?.icono ?? ''
    });

    const handleChange = (e: any) => setState(prev => ({ ...prev, [e.target.name]: e.target.value }));

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Configuración de categoría'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre de categoría'}</Form.Label>
                        <Form.Control
                            type='text'
                            value={state.nombre}
                            name='nombre'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{'Icono'}</Form.Label>
                        <Form.Control
                            type='text'
                            value={state.icono}
                            name='icono'
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'><i className={`bi-trash text-white fs-3`}></i></Button>
                    <Button variant="secondary" onClick={onClose}>{'Cancelar '}<i className={`bi-x text-white fs-3`}></i></Button>
                    <Button variant="primary" onClick={onClose}>{'Aplicar '}<i className={`bi-check2 text-white fs-3`}></i></Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateCatalogo;