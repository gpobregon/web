/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from "react";
import ContentEditable from "react-contenteditable";
import { Popover, Form } from 'react-bootstrap'
import { stripHtml } from '../../../../../../utility/global/index';
import { useContextMenu } from "react-contexify";
import MenuDoubleClick from '../../../../menu/doubleClick'
import ContextMenu from '../../../../menu/contextMenu'

type Model = {
    data: any
    referencia: any
    handlerId: any
    isDragging: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
}
const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

    const idMenu = `menu-${data.id}`
    const nameMenu = `custom-${data.id}`

    const { show } = useContextMenu({ id: idMenu })

    const { show: showMenu2 } = useContextMenu({ id: nameMenu })

    const [dataSelect, setDataSelect] = useState<any>([])

    const changeText = (e: any) => {
        const edit = {
            ...data,
            ...e
        }
        updateElement(edit)
    }

    const destroyItem = (e: any) => {
        removeItem(dataSelect.id);
        setEditItem([])
    }

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
            <div className="w-100">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item">
                            <div className={`nav-link px-3 ${data.facebook !== '' ? 'text-white' : 'text-muted'}`}>
                                <div className="popover__wrapper">
                                    <i className={`bi bi-facebook fs-1 ${data.facebook !== '' ? 'text-white' : 'text-muted'}`} />
                                    <div className="popover__content">
                                        <Form.Control placeholder="ingresa url" size="sm" defaultValue={data.facebook} onChange={(e: any) => changeText({ facebook: stripHtml(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link px-3 ${data.twitter !== '' ? 'text-white' : 'text-muted'}`}>
                                <div className="popover__wrapper">
                                    <i className={`bi bi-twitter fs-1 ${data.twitter !== '' ? 'text-white' : 'text-muted'}`} />
                                    <div className="popover__content">
                                        <Form.Control placeholder="ingresa url" size="sm" defaultValue={data.twitter} onChange={(e: any) => changeText({ twitter: stripHtml(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link px-3 ${data.instagram !== '' ? 'text-white' : 'text-muted'}`}>
                                <div className="popover__wrapper">
                                    <i className={`bi bi-instagram fs-1 ${data.instagram !== '' ? 'text-white' : 'text-muted'}`} />
                                    <div className="popover__content">
                                        <Form.Control placeholder="ingresa url" size="sm" defaultValue={data.instagram} onChange={(e: any) => changeText({ instagram: stripHtml(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link px-3 ${data.youtube !== '' ? 'text-white' : 'text-muted'}`}>
                                <div className="popover__wrapper">
                                    <i className={`bi bi-youtube fs-1 ${data.youtube !== '' ? 'text-white' : 'text-muted'}`} />
                                    <div className="popover__content">
                                        <Form.Control placeholder="ingresa url" size="sm" defaultValue={data.youtube} onChange={(e: any) => changeText({ youtube: stripHtml(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link px-3 ${data.tiktok !== '' ? 'text-white' : 'text-muted'}`}>
                                <div className="popover__wrapper">
                                    <i className={`bi bi-tiktok fs-1 ${data.tiktok !== '' ? 'text-white' : 'text-muted'}`} />
                                    <div className="popover__content">
                                        <Form.Control placeholder="ingresa url" size="sm" defaultValue={data.tiktok} onChange={(e: any) => changeText({ tiktok: stripHtml(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="text-center text-muted">
                        <ContentEditable
                            id={data.id}
                            className={`p-1 lex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
                            html={`${data.text}`} // innerHTML of the editable div
                            disabled={isDragging} // use true to disable edition
                            onChange={(e: any) => changeText({ text: e.target.value })} // handle innerHTML change
                            onClick={() => setEditItem(data)}
                        />
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Text