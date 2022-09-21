import React, {useState, FC, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Modal, Form} from 'react-bootstrap'
import {CatalogLanguage} from '../../../models/catalogLanguage'
import {getData, languagesMethod} from '../../../services/api'
import { validateStringSinCaracteresEspeciales } from '../../validarCadena/validadorCadena'

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
        background: state.isFocused ? '#009EF7' : '#323248',
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

// const options = [
//     {value: 'airplane', label: 'airplane'},
//     {value: 'bag', label: 'bag'},
//     {value: 'bank', label: 'bank'},
//     {value: 'basket', label: 'basket'},
//     {value: 'binoculars', label: 'binoculars'},
//     {value: 'brightness-alt-high', label: 'brightness-alt-high'},
//     {value: 'brush', label: 'brush'},
//     {value: 'building', label: 'building'},
//     {value: 'camera-reels', label: 'camera-reels'},
//     {value: 'car-front', label: 'car-front'},
//     {value: 'cloud-sun', label: 'cloud-sun'},
//     {value: 'cup-hot', label: 'cup-hot'},
//     {value: 'bi-film', label: 'bi-film'},
//     {value: 'bi-flower1', label: 'bi-flower1'},
//     {value: 'geo-alt', label: 'geo-alt'},
//     {value: 'bi-hospital', label: 'bi-hospital'},
//     {value: 'image-alt', label: 'image-alt'},
//     {value: 'life-preserver', label: 'life-preserver'},
//     {value: 'mortarboard', label: 'mortarboard'},
//     {value: 'palette', label: 'palette'},
//     {value: 'puzzle', label: 'puzzle'},
//     {value: 'tree', label: 'tree'},
//     {value: 'tsunami', label: 'tsunami'},
// ]

// const optionTemplate = (option: any) => (
//     <span>
//         <i className={`bi-${option.value} text-white`} style={{fontSize: 16}}></i>
//         {`ㅤ${option.label}`}
//     </span>
// )

const options = [
    {value: 'plane', label: 'plane'},
    {value: 'shopping-bag', label: 'shopping-bag'},
    {value: 'landmark', label: 'landmark'},
    {value: 'store', label: 'store'},
    {value: 'binoculars', label: 'binoculars'},
    {value: 'paint-brush', label: 'paint-brush'},
    {value: 'building', label: 'building'},
    {value: 'camera', label: 'camera'},
    {value: 'car', label: 'car'},
    {value: 'cloud-sun', label: 'cloud-sun'},
    {value: 'mug-hot', label: 'cup-hot'},
    {value: 'film', label: 'film'},
    {value: 'seedling', label: 'seedling'},
    {value: 'map-marker-alt', label: 'map-marker-alt'},
    {value: 'hospital', label: 'hospital'},
    {value: 'mountain', label: 'mountain'},
    {value: 'life-ring', label: 'life-ring'},
    {value: 'graduation-cap', label: 'graduation-cap'},
    {value: 'palette', label: 'palette'},
    {value: 'puzzle-piece', label: 'puzzle-piece'},
    {value: 'tree', label: 'tree'},
    {value: 'umbrella-beach', label: 'umbrella-beach'},
]

const optionTemplate = (option: any) => (
    <span>
        <i className={`fa-solid fa-${option.value} text-white fa-fw fa-xl`}></i>
        {`ㅤ${option.label}`}
    </span>
)

const optionsWithIcons = options.map((option) => ({
    value: option.value,
    label: optionTemplate(option),
}))

const animatedComponents = makeAnimated()

const UpdateCatalogo: FC<any> = ({show, onClose, catalogo, tag, setTag, updateTag, deleteTag}) => {
    const [languages, setLanguages] = useState<CatalogLanguage[]>([])

    const getLanguages = async () => {
        const languages: any = await getData(languagesMethod)
        setLanguages(languages.data as CatalogLanguage[])
    }

    const languagesOptions = languages.map((language) => ({
        value: language.id_lenguaje,
        label: language.nombre,
    }))

    let modifiedTagDelete = {
        id_categoria: catalogo.id_categoria,
        id_lenguaje: catalogo.idioma?.id,
        estado: 0,
    }

    const handleChangeIcon = (event: any) => {
        setTag({
            id_categoria: catalogo.id_categoria,
            nombre: tag.nombre,
            icono: event.value,
            estado: tag.estado,
            id_lenguaje: tag.id_lenguaje,
        })
    }

    const handleChangeLanguage = (event: any) => {
        setTag({
            id_categoria: catalogo.id_categoria,
            nombre: tag.nombre,
            icono: tag.icono,
            estado: 1,
            id_lenguaje: event.value,
        })
    }

    useEffect(() => {
        getLanguages()
        setTag({
            id_categoria: catalogo.id_categoria,
            nombre: catalogo.nombre,
            icono: catalogo.icono,
            estado: 1,
            id_lenguaje: catalogo.id_lenguaje,
        })
    }, [])

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
                            defaultValue={catalogo.nombre}
                            maxLength={20}
                            type='text'
                            name='nombre'
                            className={'mb-4'}
                            onChange={(e) => {
                                if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                    setTag({
                                        id_categoria: catalogo.id_categoria,
                                        nombre: e.target.value,
                                        icono: tag.icono,
                                        estado: tag.estado,
                                        id_lenguaje: tag.id_lenguaje,
                                    })
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{'Icono'}</Form.Label>
                        <Select
                            defaultValue={{
                                label: catalogo?.icono,
                                value: catalogo?.icono,
                            }}
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
                            defaultValue={{
                                label: catalogo?.idioma?.nombre,
                                value: catalogo?.idioma?.id,
                            }}
                            onMenuOpen={() => getLanguages()}
                            options={languagesOptions}
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={handleChangeLanguage}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            deleteTag(modifiedTagDelete)
                            setTag({
                                id_categoria: 0,
                                nombre: '',
                                icono: '',
                                estado: 1,
                                id_lenguaje: 0,
                            })
                        }}
                    >
                        <i className={`bi-trash text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            onClose()
                            setTag({
                                id_categoria: 0,
                                nombre: '',
                                icono: '',
                                estado: 1,
                                id_lenguaje: 0,
                            })
                        }}
                    >
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            setTag({
                                id_categoria: catalogo.id_categoria,
                                nombre: tag.nombre,
                                icono: tag.icono,
                                estado: 1,
                                id_lenguaje: tag.id_lenguaje,
                            })

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
