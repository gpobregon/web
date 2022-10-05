/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from "react";
import { Image } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { useContextMenu } from "react-contexify";
import MenuDoubleClick from '../../../menu/doubleClick'
import ContextMenu from '../../../menu/contextMenu'

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
}

const Url: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

    const idMenu = `menu-${data.id}`
    const nameMenu = `custom-${data.id}`

    const { show } = useContextMenu({ id: idMenu })

    const { show: showMenu2 } = useContextMenu({ id: nameMenu })

    const [dataSelect, setDataSelect] = useState<any>([])

    const destroyItem = (e: any) => {
        removeItem(e.triggerEvent.target.id);
        setEditItem([])
    }

    function interpretHTML(data: any) {
        return {
            __html: data && data
        };
    };

    const OpenMenu = (e: any, data: any) => {
        setEditItem(data)
        setDataSelect(data)
        show(e)
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
                onContextMenu={(e: any) => OpenMenu(e, data)}
                onDoubleClick={showMenu2}
            >
                <i className="bi bi-grip-vertical fa-2x" id={data.id} />
            </div>
            <ContextMenu
                destroyItem={destroyItem}
                idMenu={idMenu}
            />
            <MenuDoubleClick
                updateElement={updateElement}
                nameMenu={nameMenu}
                editItem={data}
            />
            <div className="w-100 text-center pe-5">
                {
                    data.text === 'Mapa' ?
                        <Image
                            ref={referencia}
                            data-handler-id={handlerId}
                            alt="Logo"
                            className={`max-h-100px cursor-pointer text-center`}
                            src={toAbsoluteUrl(`/media/svg/iconsFigma/FakeMap.svg`)}
                        />
                        : data.text && <div dangerouslySetInnerHTML={interpretHTML(data.text)} />
                }
            </div>
        </div>
    )
}

export default Url