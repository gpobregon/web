/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Image } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
}

const Url: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

    const { show } = useContextMenu({ id: "menu-id" });

    const destroyItem = (e: any) => {
        removeItem(e.triggerEvent.target.id);
        setEditItem([])
    }

    const saveElement = (e: any) => {
        // saveResourceElement(e.triggerEvent.target.id)
    }

    return (
        <div
            ref={referencia}
            data-handler-id={handlerId}
            className="d-flex cursor-grabbing my-3"
            onClick={() => setEditItem(data)}
        >
            <div
                className="p-1 py-1 d-flex align-items-center"
                id={data.id}
                onContextMenu={show}
            >
                <i className="bi bi-grip-vertical fa-2x" id={data.id} />
            </div>
            <Menu id={"menu-id"} theme="dark" data-test={data}>
                <Item onClick={(e: any) => destroyItem(e)}>
                    <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
                </Item>
                <Item onClick={(e: any) => saveElement(e)}>
                    <i className="fa fa-save text-success pe-4" />Guardar Recurso
                </Item>
            </Menu>
            <div className="w-100 text-center">
                <Image
                    ref={referencia}
                    data-handler-id={handlerId}
                    alt="Logo"
                    className={`max-h-100px cursor-pointer text-center`}
                    src={toAbsoluteUrl(`/media/svg/iconsFigma/FakeMap.svg`)}
                />
            </div>
        </div>
    )
}

export default Url