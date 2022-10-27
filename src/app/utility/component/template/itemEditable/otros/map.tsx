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


    const idMenu = `menu-${data.id}`

    const { show } = useContextMenu({ id: idMenu })

    const destroyItem = (e: any) => {
        removeItem(e.triggerEvent.target.id);
        setEditItem([])
    }

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

                <Image
                    ref={referencia}
                    data-handler-id={handlerId}
                    alt="Logo"
                    className={`max-h-100px cursor-pointer text-center`}
                    src={toAbsoluteUrl(`/media/svg/iconsFigma/FakeMap.svg`)}
                />

            </div>


        </div >
    )
}

export default Picture