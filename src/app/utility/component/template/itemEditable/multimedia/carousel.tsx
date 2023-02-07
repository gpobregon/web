/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect} from 'react'
import Masonry from 'react-masonry-css'
import Image from '../../../resource/imageCarousel'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Popover, OverlayTrigger, Button, Row, Col, Form} from 'react-bootstrap'
import {Menu, Item, useContextMenu} from 'react-contexify'
import {ContentContext} from '../../../../../modules/template/movil/context'
import CustomCarusel from '../../../carousel/index'
import {useForm} from 'react-hook-form'

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
}

type FormData = {
    titulo: string
    descripcion: string
}

const Carousel: FC<Model> = ({
    referencia,
    handlerId,
    data,
    setEditItem,
    updateElement,
    removeItem,
}) => {
    const {allResources, changeTypeEdit} = useContext(ContentContext)
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormData>()
    const [selectedItem, setSelectedItem] = useState<any>([])
    const [selected, setSelected] = useState<any>([])
    const [itemsList, setItemsList] = useState<any>([])
    const [count, setCount] = useState<number>(0)
    const breakpointColumnsObj = {default: 2, 1100: 2, 700: 2, 500: 2}

    const idMenu = `menu-${data.id}`

    const {show} = useContextMenu({id: idMenu})

    const destroyItem = (e: any) => {
        removeItem(e.triggerEvent.target.id)
        setEditItem([])
    }

    const changeText = (e: any) => {
        const edit = {
            ...data,
            ...e,
        }
        updateElement(edit)
    }

    const removeImage = () => {
        const response = itemsList.filter((item: any) => item.id_recurso !== selected.id_recurso)
        const response2 = selectedItem.filter((item: any) => item !== selected.id_recurso)
        setItemsList(response)
        setSelectedItem(response2)
        setSelected([])
        changeText({list: response})
        reset()
    }

    const appendItem = (data: any) => {
        if (!selectedItem.includes(selected.id_recurso) && selected.id_recurso) {
            setSelectedItem([...selectedItem, selected.id_recurso])
            setItemsList([...itemsList, {...selected, ...data}])
            setSelected([])
            setCount(1)
            reset()
        }
    }

    const editItem = (data: any) => {
        //edit item
       if (selectedItem.includes(selected.id_recurso)) {
            const response = itemsList.map((item: any) => {
                if (item.id_recurso === selected.id_recurso) {
                    item.titulo = data.titulo
                    item.descripcion = data.descripcion
                }
                return item
            })
            changeText({list: response})
            setItemsList(response)
            setCount(1)
        }
    }

    const selectionData = (item: any) => { 
        reset()
        const element = data.list.filter((el: any) => el.id_recurso === item.id_recurso)
        item.id_recurso && !selected.id_recurso ? setSelected({...item, titulo: element[0]?.titulo, descripcion: element[0]?.descripcion}) : setSelected([])
    }

    useEffect(() => {
        if (count === 1) {
            changeText({list: itemsList, selectedItem})
            setCount(0)
        }
    }, [count])


    useEffect (
        () => {
            if (data.list.length > 0) {
                const items = data.list.map( (element: any) => element.id_recurso )
                setSelectedItem(items)
                setItemsList(data.list)
            }
        }, []
    )
    const popoverClick = (
        <Popover
            id='popover-basic'
            style={{transform: 'translate(-366px, 317px)', maxWidth: '358px'}}
        >
            <Popover.Header as='h3'>Imágenes</Popover.Header>
            <Popover.Body>
                <PerfectScrollbar
                    style={{height: '250px', maxWidth: '400px', width: '100%'}}
                    className='min-tumnail px-4'
                >
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className='my-masonry-grid'
                        columnClassName='my-masonry-grid_column'
                    >
                        {allResources.map((file: any, index: number) => {
                            return (
                                file.tipo.includes('image/') && (
                                    <Image
                                        key={index}
                                        item={file}
                                        selectedItem={selectedItem}
                                        setSelected={selectionData}
                                        selected={selected}
                                    />
                                )
                            )
                        })}
                    </Masonry>
                </PerfectScrollbar>
            </Popover.Body>
            <hr />
            <Popover.Header>
                <div className='d-flex'>
                    <div className='flex-shrink-1 px-4 d-flex justify-content-center align-items-center'>
                        <i
                            className={`bi bi-trash ${
                                selectedItem.includes(selected.id_recurso)
                                    ? 'text-danger'
                                    : 'text-muted'
                            } fs-2 cursor-pointer`}
                            onClick={() =>
                                selectedItem.includes(selected.id_recurso) ? removeImage() : null
                            }
                        />
                    </div>
                    <div>
                        <Form
                            onSubmit={
                                selectedItem.includes(selected.id_recurso)
                                    ? handleSubmit(editItem)
                                    : handleSubmit(appendItem)
                            }
                        >
                            <Row>
                                <p className='text-primary text-center w-100'>
                                    {selected.id_recurso
                                        ? selected.nombre
                                        : 'Seleccione una imagen'}
                                </p>
                                <Col lg={12} className='py-3'>
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control
                                        type='text'
                                        size='sm'
                                        defaultValue={selected.titulo}
                                        {...register('titulo', {
                                            required: {
                                                value: false,
                                                message: 'Este campo es requerido',
                                            },
                                        })}
                                        isInvalid={!!errors.titulo}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {!!errors.titulo && errors.titulo.message}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col lg={12}>
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        type='text'
                                        size='sm'
                                        defaultValue={selected.descripcion}
                                        {...register('descripcion', {
                                            required: {
                                                value: false,
                                                message: 'Este campo es requerido',
                                            },
                                        })}
                                        isInvalid={!!errors.descripcion}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {!!errors.descripcion && errors.descripcion.message}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col lg={12} className='w-100 d-grid gap-2 pt-2'>
                                    <Button size='sm' type='submit'>
                                        {selectedItem.includes(selected.id_recurso)
                                            ? 'Editar'
                                            : 'Agregar'}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Popover.Header>
        </Popover>
    )

    return (
        <div
            onClick={() => setEditItem(data)}
            ref={referencia}
            data-handler-id={handlerId}
            className='d-flex cursor-grabbing'
        >
            <div className='p-1 py-1 d-flex align-items-center' id={data.id} onContextMenu={show}>
                <i className='bi bi-grip-vertical fa-2x' id={data.id} />
            </div>
            <Menu id={idMenu} theme='dark' data-test={data}>
                <Item onClick={(e: any) => destroyItem(e)}>
                    <div>
                        <i className='bi bi-x-circle-fill text-danger pe-4' />
                        Quitar Elemento
                    </div>
                </Item>
            </Menu>

            <div
                className={`my-1 py-2 editable ${data.textAling} w-100 d-flex justify-content-center`}
            >
                {changeTypeEdit === 1 ? (
                    data.list.length > 0 ? (
                        <CustomCarusel list={data.list} />
                    ) : (
                        <i className={`bi bi-images display-2 text-white`} />
                    )
                ) : (
                    <>
                        <OverlayTrigger trigger='click' placement='left' overlay={popoverClick}>
                            <i className='bi bi-plus-circle-fill text-white fw-bolder fs-2 cursor-pointer shadow-sm position-icon' title='Editar contenido'/>
                         
                        </OverlayTrigger>
                        <div className='px-3'>
                            {data.list.length > 0 ? (
                                <CustomCarusel list={data.list} />
                            ) : (
                                <i className={`bi bi-images display-2 text-white`} />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Carousel
