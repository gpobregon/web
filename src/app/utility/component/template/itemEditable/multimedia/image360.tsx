/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
import { Image } from 'react-bootstrap';
import Img360 from '../../../carousel/image360'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { Menu, Item, useContextMenu } from "react-contexify"

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
}

const Video: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

    const { show } = useContextMenu({ id: "menu-id" });

    const destroyItem = (e: any) => {
        removeItem(e.triggerEvent.target.id);
        setEditItem([])
    }

    return (
        <div
            ref={referencia}
            data-handler-id={handlerId}
            onClick={() => setEditItem(data)}
            className="d-flex cursor-grabbing"
        >
            <div
                className="p-1 py-1 d-flex align-items-center"
                id={data.id}
                onContextMenu={show} >
                <i className="bi bi-grip-vertical fa-2x" id={data.id} />
            </div>
            <Menu id={"menu-id"} theme="dark" data-test={data}>
                <Item onClick={(e: any) => destroyItem(e)}>
                    <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
                </Item>
                <Item >
                    <i className="fa fa-save text-success pe-4" />Guardar Recurso
                </Item>
            </Menu>
            <div id={data.id} className={`editable ${data.textAling} w-100 text-center`}>
                {
                    data.url ? (
                        <Img360 data={data} />
                    )
                        :
                        (
                            <Fragment>
                                <Image
                                    alt="Logo"
                                    width="100px"
                                    className={`max-h-100px cursor-pointer`}
                                    src={toAbsoluteUrl(`/media/svg/iconsFigma/${data.icon}`)}
                                />
                                <p className="icon-name text-truncate mb-0 mt-1 small">Imagen 360°</p>
                            </Fragment>
                        )
                }
            </div>
        </div>
    )
}

export default Video