/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useRef } from "react";
import { Popover, OverlayTrigger, Button, Image, Col, Row, Form } from 'react-bootstrap'
import { Menu, Item, useContextMenu } from "react-contexify";
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { ContentContext } from '../../../../../modules/template/movil/context'
import { interpretHTML } from '../../../../../utility/global/index';

type Model = {
    data: any
    referencia: any
    handlerId: any
    isDragging: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
}
const Picture: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

    const titulo = useRef<HTMLInputElement>(null)

    const { changeTypeEdit } = useContext(ContentContext)


    const idMenu = `menu-${data.id}`

    const { show } = useContextMenu({ id: idMenu })

    const destroyItem = (e: any) => {
        removeItem(e.triggerEvent.target.id);
        setEditItem([])
    }

    const changeText = () => {
        if (titulo.current) {
            const edit = {
                ...data,
                text: titulo.current.value,
            }
            updateElement(edit)
        }

    }

    const removeImage = () => {
        const edit = {
            ...data,
            text: 'Mapa'
        }
        updateElement(edit)
    }

    const popoverClick = (
        <Popover id="popover-basic" style={{ transform: 'translate(-366px, 317px)', maxWidth: '358px' }}>
            <Popover.Header as="h3">Formulario</Popover.Header>
            <Popover.Body>
                <Row className="py-1">
                    <Col className="mx-1 px-0">
                        <Form.Control defaultValue={data.text} placeholder="inserte contenido de google maps" size="sm" type="text" ref={titulo} />
                    </Col>
                </Row>
            </Popover.Body>
            <hr />
            <Popover.Header>
                <div className="d-flex">
                    <div className="flex-shrink-1 px-4 d-flex justify-content-center align-items-center">
                        <i className="bi bi-trash text-danger fs-2" onClick={() => removeImage()} />
                    </div>
                    <div className="w-100 d-grid gap-2">
                        <Button size="sm" onClick={() => changeText()}>Listo</Button>
                    </div>
                </div>
            </Popover.Header>
        </Popover>
    );

    return (
        <div
            onClick={() => setEditItem(data)}
            ref={referencia}
            data-handler-id={handlerId}
            className="d-flex cursor-grabbing"
        >
            <div className="p-1 py-1 d-flex align-items-center" id={data.id} onContextMenu={show}>
                <i className="bi bi-grip-vertical fa-2x" id={data.id} />
            </div>
            <Menu id={idMenu} theme="dark" data-test={data}>
                <Item onClick={(e: any) => destroyItem(e)}>
                    <div>
                        <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
                    </div>
                </Item>
            </Menu>

            <div className={`editable ${data.textAling} w-100 d-flex justify-content-center`}>
                {changeTypeEdit === 1 ?
                    (
                        data.text === 'Mapa' ?
                            <Image
                                ref={referencia}
                                data-handler-id={handlerId}
                                alt="Logo"
                                className={`max-h-100px cursor-pointer text-center`}
                                src={toAbsoluteUrl(`/media/svg/iconsFigma/FakeMap.svg`)}
                            />
                            : <div dangerouslySetInnerHTML={interpretHTML(data.text)} />
                    )
                    :
                    (<OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={popoverClick}
                    >
                        {data.text === 'Mapa' ?
                            <Image
                                ref={referencia}
                                data-handler-id={handlerId}
                                alt="Logo"
                                className={`max-h-100px cursor-pointer text-center`}
                                src={toAbsoluteUrl(`/media/svg/iconsFigma/FakeMap.svg`)}
                            /> :
                            <div dangerouslySetInnerHTML={interpretHTML(data.text)} />
                        }
                    </OverlayTrigger>
                    )
                }
            </div>


        </div >
    )
}

export default Picture