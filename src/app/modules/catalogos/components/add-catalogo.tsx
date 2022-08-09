import React, { useState, FC } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Button, Modal, Form } from 'react-bootstrap';

const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        background: 'transparent',
        borderColor: state.isFocused ? '#474761' : '#323248',
        borderRadius: 6.175,
        color: '#92929F',
        '&:hover': {
            borderColor: '#323248',
        },
        '&:focus': {
            borderColor: '#323248',
        },
        '&:active': {
            borderColor: '#323248',
        },
    }),
    input: (base: any, state: any) => ({
        ...base,
        color: '#92929f',
    }),
    option: (base: any, state: any) => ({
        ...base,
        background: state.isFocused ? '#7239ea' : '#323248',
        color: state.isFocused ? '#fff' : '#92929F',
        padding: 10,
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#fff',
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: 6.175,
        background: '#323248',
    }),
    menuList: (base: any) => ({
        ...base,
        padding: 0,
        borderRadius: 6.175,
    }),
}

const options = [
    { value: 'car-front', label: 'car-front' },
    { value: 'book', label: 'book' },
    { value: 'apple', label: 'apple' },
    { value: 'tree', label: 'tree' },
    { value: 'bank', label: 'bank' },
    { value: 'airplane', label: 'airplane' },
]

const languages = [
    {
        value: 'Español (Guatemala)',
        label: 'Español (Guatemala)',
    },
    {
        value: 'Inglés (EEUU)',
        label: 'Inglés (EEUU)',
    },
]

const optionTemplate = (option: any) => (
    <span>
        <i className={`bi-${option.value} text-white`} style={{ fontSize: 16 }}></i>
        {`ㅤ${option.label}`}
    </span>
)

const optionsWithIcons = options.map((option) => ({
    value: option.value,
    label: optionTemplate(option),
}))

const animatedComponents = makeAnimated()

const AddCatalogo: FC<any> = ({ show, onClose }) => {
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Nueva categoría'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre de categoría'}</Form.Label>
                        <Form.Control
                            type='text'
                            name='nombre'
                            className={'mb-4'}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{'Icono'}</Form.Label>
                        <Select
                            options={optionsWithIcons}
                            styles={customStyles}
                            components={animatedComponents}
                            className={'mb-4'}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{'Idioma'}</Form.Label>
                        <Select
                            options={languages}
                            styles={customStyles}
                            components={animatedComponents}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>{'Cancelar '}<i className={`bi-x text-white fs-3`}></i></Button>
                    <Button variant="primary" onClick={onClose}>{'Aplicar '}<i className={`bi-check2 text-white fs-3`}></i></Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCatalogo;