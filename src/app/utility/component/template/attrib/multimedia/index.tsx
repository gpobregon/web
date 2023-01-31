/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect, useRef, Fragment, useContext} from 'react'
import {Row, Col, Button, ButtonGroup, Form} from 'react-bootstrap'
import {generateRandomString} from '../../../../../utility/global/index'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {dataURLtoFile} from '../../../../global/index'
import {Image} from 'react-bootstrap'
import {ContentContext} from '../../../../../modules/template/movil/context'
import CropImage from './cropImage'
import swal from 'sweetalert'

type Model = {
    editItem: any
    updateElement: (data: any) => void
    drop2: any
    editItemResource: any
    uploadResource: any
    setEditItemResource: (data: any) => void
}

const AttrText: FC<Model> = ({
    editItem,
    updateElement,
    drop2,
    editItemResource,
    uploadResource,
    setEditItemResource,
}) => {
    const [dataResource, setDataResource] = useState([])
    const [extensionAllow, setExtensionAllow] = useState(false)
    const titulo = useRef<HTMLInputElement>(null)
    const descripcion = useRef<HTMLInputElement>(null)

    const {changeTypeEdit} = useContext(ContentContext)

    const changeSizeTitle = (data: {}) => {
        const item = {
            ...editItem,
            ...data,
        }
        updateElement(item)
    }

    const cropImage = async () => {
        changeResource()
        const img = dataURLtoFile(
            dataResource,
            editItemResource.nombre.replace('.jpg', '.png').replace('.jpeg', '.png')
        )
        const response = await uploadResource(img, 2)
        changeSizeTitle({url: response})
        setDataResource([])
    }

    const clearDataFormCarousel = () => {
        if (titulo.current && descripcion.current) {
            titulo.current.value = ''
            descripcion.current.value = ''
            setEditItemResource([])
        }
    }
    const appedItemsCarousel = () => {
        if (editItemResource.url) {
            const items = {
                id: generateRandomString(7),
                url: editItemResource.url,
                titulo: titulo.current && titulo.current.value,
                descripcion: descripcion.current && descripcion.current.value,
            }
            changeSizeTitle({list: [...editItem.list, items]})
            clearDataFormCarousel()
        } else {
            swal({
                title: 'Error!',
                text: 'Seleccione una imagen antes de agregar al carrusel',
                icon: 'error',
            })
        }
    }

    const destroyElementCarousel = (id: string) => {
        const response = editItem.list.filter((item: any) => String(item.id) !== String(id))
        changeSizeTitle({list: response})
    }

    const editElementCarousel = (id: string, titulo: string, descripcion: string) => {
        // buscar el elemento por id y cambiar el titulo y descripcion
        const response = editItem.list.map((item: any) => {
            if (String(item.id) === String(id)) {
                item.titulo = titulo
                item.descripcion = descripcion
            }
            return item
        })
        changeSizeTitle({list: response})
    }

    const changeResource = () => {
        changeSizeTitle({url: ''})
        setEditItemResource([])
    }
    useEffect(() => {
        if (
            editItemResource.tipo &&
            (editItemResource.tipo.includes('video') ||
                editItemResource.tipo.includes('audio') ||
                (editItemResource.tipo.includes('image') && editItem.type === 'image-360'))
        ) {
            changeSizeTitle({url: editItemResource.url})
        }
    }, [editItemResource])

    var extensionesValidas = '.png, .gif, .jpeg, .jpg, .jfif'
    useEffect(() => {
        var extension = editItem.url?.substring(editItem.url?.lastIndexOf('.') + 1).toLowerCase()
        var extensionValida: number = extensionesValidas.indexOf(extension)
        if (editItem.type === 'image') {
            if (extensionValida > 0) {
                setEditItemResource({url: editItem.url})
                setExtensionAllow(true)
            } else {
                setExtensionAllow(false)
                // if(editItem.url){
                //     swal({
                //         title: 'Error!',
                //         text: `La imagen debe tener una de las siguientes extensiones ${extensionesValidas}`,
                //         icon: 'error',
                //     })
                // }
                editItem.url = ''
                setEditItemResource([])
            }
        }
    }, [editItem])

    return (
        <div className='w-100 text-center' ref={drop2}>
            {editItem.type === 'image' && (
                <Row>
                    <div>
                        <p className='small text-muted'>
                            {changeTypeEdit === 1
                                ? 'Se recomienda no cargar imagenes mayores a 5 MB'
                                : ''}
                        </p>
                    </div>
                    <Col className='d-flex justify-content-center '>
                        <div className='py-2 d-flex flex-row'>
                            <div className='tooltip-container mx-2'>
                                <Button
                                    size='sm'
                                    variant='secondary'
                                    className='btn-icon tooltip-trigger'
                                    onClick={() => changeResource()}
                                >
                                    <Image
                                        alt='Logo'
                                        className={`max-h-100px cursor-pointer`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/Change.svg`)}
                                    />
                                </Button>
                                <div className='tooltip-one'>Cambiar Imagen</div>
                            </div>

                            <div className='tooltip-container mx-2'>
                                <Button
                                    size='sm'
                                    variant='secondary'
                                    className='btn-icon tooltip-trigger'
                                    onClick={() => cropImage()}
                                >
                                    <Image
                                        alt='Logo'
                                        className={`max-h-100px cursor-pointer`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/Crop.svg`)}
                                    />
                                </Button>
                                <div className='tooltip-one'>Recortar</div>
                            </div>

                            <div className='tooltip-container mx-2'>
                                <Button
                                    size='sm'
                                    variant='secondary'
                                    className='btn-icon tooltip-trigger'
                                    onClick={() => changeSizeTitle({url: editItemResource.url})}
                                >
                                    <i className='fa fa-check fs-3 text-success'></i>
                                </Button>
                                <div className='tooltip-one'>Asignar</div>
                            </div>

                            <div className='tooltip-container mx-2'>
                                <Button
                                    size='sm'
                                    variant='secondary'
                                    className='btn-icon tooltip-trigger'
                                    onClick={() => changeSizeTitle({borderRadius: 'rounded-top'})}
                                >
                                    <Image
                                        alt='Logo'
                                        className={`max-h-100px cursor-pointer`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/Trash.svg`)}
                                    />
                                </Button>
                                <div className='tooltip-one'>Eliminar Imagen</div>
                            </div>
                        </div>
                    </Col>
                    {editItemResource.nombre || (editItemResource.url && extensionAllow) ? (
                        <Fragment>
                            <Col lg={12}>
                                <div className='w-100'>
                                    <CropImage
                                        editItemResource={editItemResource}
                                        setDataResource={setDataResource}
                                    />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <small>{editItemResource.nombre}</small>
                            </Col>
                        </Fragment>
                    ) : (
                        <Row>
                            <Col>
                                <div className='resource-element size-resource-video rounded d-flex justify-content-center align-items-center'>
                                    <span className='text-center'>
                                        <p>
                                            <i className='bi bi-arrow-90deg-down text-white' />
                                        </p>
                                        <p>Arrasta una imagen de los recursos</p>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Row>
            )}
            {(editItem.type === 'video' ||
                editItem.type === 'audio' ||
                editItem.type === 'image-360') && (
                <Fragment>
                    <Row>
                        <Col>
                            <div className='resource-element size-resource-video rounded d-flex justify-content-center align-items-center'>
                                <span className='text-center'>
                                    <p>
                                        <i className='bi bi-arrow-90deg-down text-white' />
                                    </p>
                                    <p>
                                        Arrasta{' '}
                                        {editItem.type === 'video'
                                            ? 'un video'
                                            : editItem.type === 'audio'
                                            ? 'un audio'
                                            : 'una Imagen 360°'}{' '}
                                        de los recursos
                                    </p>
                                </span>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <small>{editItemResource.nombre}</small>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <div className='tooltip-container'>
                            <Button
                                variant='secondary'
                                className='btn-icon tooltip-trigger'
                                onClick={() => changeResource()}
                                disabled={!editItemResource.url}
                            >
                                <Image
                                    alt='Logo'
                                    className={`max-h-100px cursor-pointer`}
                                    src={toAbsoluteUrl(`/media/svg/iconsFigma/Change.svg`)}
                                />
                            </Button>
                            <div className='tooltip-one'>Cambiar Video</div>
                        </div>
                    </Row>
                </Fragment>
            )}

            {editItem.type === 'carousel' && (
                <Fragment>
                    <Row>
                        <Col>
                            {!editItemResource.url ? (
                                <div>
                                    <div>
                                        <p className='small text-muted'>
                                            {changeTypeEdit === 1
                                                ? 'Se recomienda no cargar imagenes mayores a 5 MB'
                                                : ''}
                                        </p>
                                    </div>

                                    <div className='resource-element size-resource-video rounded d-flex justify-content-center align-items-center'>
                                        <span className='text-center'>
                                            <p>
                                                <i className='bi bi-arrow-90deg-down text-white' />
                                            </p>
                                            <p>Arrasta una imagen</p>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className='w-100'>
                                    <Image
                                        alt='Logo'
                                        className={`h-100 mh-150px cursor-pointer`}
                                        src={editItemResource.url}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col lg={12}>
                            <small>{editItemResource.nombre}</small>
                        </Col>
                        <Col lg={12} className='py-3'>
                            <Form.Label>Título</Form.Label>
                            <Form.Control type='text' size='sm' placeholder='Título' ref={titulo} />
                            {titulo.current && !titulo.current.value && 'El título es requerido'}
                        </Col>
                        <Col lg={12}>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type='text'
                                size='sm'
                                placeholder='Descripción'
                                ref={descripcion}
                            />
                            {descripcion.current &&
                                !descripcion.current.value &&
                                'El título es requerido'}
                        </Col>
                        <Col lg={12} className='pt-3 d-flex justify-content-center'>
                            <Button type='button' size='sm' onClick={() => appedItemsCarousel()}>
                                Agregar
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col>
                            <ul className='list-group overflow-auto' style={{height: '100px'}}>
                                {editItem.list.map((item: any, index: number) => {
                                    return (
                                        <li className='list-group-item bg-transparent' key={index}>
                                            <div className='d-flex'>
                                                <div className='p-2 w-100'>
                                                    <Form.Label>Título</Form.Label>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        defaultValue={
                                                            item.titulo ? item.titulo : item.id
                                                        }
                                                        onChange={(e) =>
                                                            editElementCarousel(
                                                                item.id,
                                                                e.target.value,
                                                                item.descripcion
                                                            )
                                                        }
                                                    />
                                                    <Form.Label>Descripción</Form.Label>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        defaultValue={
                                                            item.descripcion
                                                                ? item.descripcion
                                                                : item.id
                                                        }
                                                        onChange={(e) =>
                                                            editElementCarousel(
                                                                item.id,
                                                                item.titulo,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div
                                                    className='p-2 flex-shrink-1'
                                                    onClick={() => destroyElementCarousel(item.id)}
                                                >
                                                    <i className='bi bi-trash text-danger cursor-pointer'></i>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Col>
                    </Row>
                </Fragment>
            )}
            {/* <Row className="pt-5">
                <Col lg={12}>
                    {
                        (editItem.type === 'video') &&
                        <Row>
                            <Form.Label>Tipo de Borde</Form.Label>
                            <ButtonGroup aria-label="Basic example" size="sm">
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded' })} ><div className="btn-style cornered-edge"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-circle' })} ><div className="btn-style border rounded-circle border-white w-25"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-pill' })} ><div className="btn-style border rounded-pill border-white w-25"></div></Button>
                            </ButtonGroup>
                        </Row>
                    }

                </Col>
            </Row> */}
        </div>
    )
}

export default AttrText
