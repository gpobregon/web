import React, {useState, FC, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Modal, Form} from 'react-bootstrap'
import {CatalogLanguage} from '../../../models/catalogLanguage'
import {getData, languagesMethod} from '../../../services/api'

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
    {value: 'car-front', label: 'car-front'},
    {value: 'book', label: 'book'},
    {value: 'apple', label: 'apple'},
    {value: 'tree', label: 'tree'},
    {value: 'bank', label: 'bank'},
    {value: 'airplane', label: 'airplane'},
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
        <i className={`bi-${option.value} text-white`} style={{fontSize: 16}}></i>
        {`ㅤ${option.label}`}
    </span>
)

const optionsWithIcons = options.map((option) => ({
    value: option.value,
    label: optionTemplate(option),
}))

const animatedComponents = makeAnimated()

const UpdateCatalogo: FC<any> = ({show, onClose, catalogo, updateTag}) => {
    const [tag, setTag] = useState({
        id_categoria: catalogo?.id ?? 1,
        nombre: catalogo?.nombre ?? '',
        icono: catalogo?.icono ?? '',
        estado: catalogo?.estado ?? 1,
        id_lenguaje: catalogo?.idioma?.id ?? '',
    })

    const [languages, setLanguages] = useState<CatalogLanguage[]>([])

    const getLanguages = async () => {
        const languages: any = await getData(languagesMethod)
        console.log(languages.data)
        setLanguages(languages.data as CatalogLanguage[])
    }

    useEffect(() => {
        getLanguages()
        console.log(languages)
    }, [])

    const languagesOptions = languages.map((language) => ({
        value: language.id_lenguaje,
        label: language.nombre,
    }))

    const handleChangeIcon = (event: any) => {
        setTag({
            id_categoria: tag.id_categoria,
            nombre: tag.nombre,
            icono: event.value,
            estado: tag.estado,
            id_lenguaje: tag.id_lenguaje,
        })
    }

    const handleChangeLanguage = (event: any) => {
        setTag({
            id_categoria: tag.id_categoria,
            nombre: tag.nombre,
            icono: tag.icono,
            estado: tag.estado,
            id_lenguaje: event.value,
        })
    }

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
                            placeholder={catalogo.nombre}
                            type='text'
                            name='nombre'
                            className={'mb-4'}
                            onChange={(e) => {
                                setTag({
                                    id_categoria: tag.id_categoria,
                                    nombre: e.target.value,
                                    icono: tag.icono,
                                    estado: tag.estado,
                                    id_lenguaje: tag.id_lenguaje,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{'Icono'}</Form.Label>
                        <Select
                            defaultInputValue={catalogo.icono}
                            options={optionsWithIcons}
                            styles={customStyles}
                            components={animatedComponents}
                            className={'mb-4'}
                            onChange={handleChangeIcon}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{'Idioma'}</Form.Label>
                        <Select
                            defaultInputValue={catalogo.idioma?.nombre}
                            defaultValue={{
                                label: catalogo.idioma?.nombre,
                                value: catalogo.idioma?.id,
                            }}
                            options={languagesOptions}
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={handleChangeLanguage}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'>
                        <i className={`bi-trash text-white fs-3`}></i>
                    </Button>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            updateTag(tag)
                        }}
                    >
                        {'Aplicar '}
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateCatalogo
