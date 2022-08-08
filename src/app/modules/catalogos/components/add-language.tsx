import React, { useState, FC } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddLanguaje: FC<any> = ({ show, language, onClose,}) => { 

    const [state, setState] = useState({
        id: language?.id ?? 0,
        nombre: language?.nombre ?? '',
        descripcion: language?.descripcion ?? ''
    });

    const handleChange = (e: any) => setState(prev => ({ ...prev, [e.target.name]: e.target.value, }));
    
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Configuración de idioma'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre del idioma'}</Form.Label>
                        <Form.Control
                            type='text'
                            value={state.nombre}
                            name='nombre'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{'Descripción'}</Form.Label>
                        <Form.Control
                            type='text'
                            value={state.descripcion}
                            name='descripcion'
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

export default AddLanguaje;