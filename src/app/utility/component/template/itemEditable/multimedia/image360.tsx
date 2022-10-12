/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState } from "react";
import Masonry from 'react-masonry-css'
import Img360 from '../../../carousel/image360'
import Image from '../../../resource/image2'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { Menu, Item, useContextMenu } from "react-contexify";
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { ContentContext } from '../../../../../modules/template/movil/context'

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

    const { allResources, changeTypeEdit } = useContext(ContentContext)
    const [selected, setSelected] = useState<any>([])

    const breakpointColumnsObj = { default: 2, 1100: 2, 700: 2, 500: 2 }

    const idMenu = `menu-${data.id}`

    const { show } = useContextMenu({ id: idMenu })

    const destroyItem = (e: any) => {
        removeItem(e.triggerEvent.target.id);
        setEditItem([])
    }

    const changeText = (e: any) => {
        const edit = {
            ...data,
            ...e
        }
        updateElement(edit)
    }

    const removeImage = () => {
        changeText({ url: '' })
        setSelected([])
    }

    const Listo = () => {
        selected.url && changeText({ url: selected.url })
    }

    const popoverClick = (
        <Popover id="popover-basic" style={{ transform: 'translate(-366px, 317px)', maxWidth: '358px' }}>
            <Popover.Header as="h3">Imágenes</Popover.Header>
            <Popover.Body>
                <PerfectScrollbar style={{ height: '250px', maxWidth: '400px', width: '100%' }} className="min-tumnail px-4">
                    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                        {
                            allResources.map((file: any, index: number) =>
                                file.tipo.includes('image/') && <Image key={index} item={file} selected={selected} setSelected={setSelected} />
                            )
                        }
                    </Masonry>
                </PerfectScrollbar>
            </Popover.Body>
            <hr />
            <Popover.Header>
                <div className="d-flex">
                    <div className="flex-shrink-1 px-4 d-flex justify-content-center align-items-center">
                        <i className="bi bi-trash text-danger fs-2" onClick={() => removeImage()} />
                    </div>
                    <div className="w-100 d-grid gap-2">
                        <Button size="sm" onClick={() => Listo()}>Listo</Button>
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
                        data.url !== '' ? <Img360 data={data} /> :
                            <img
                                alt="Logo"
                                width="100px"
                                className={`max-h-100px cursor-pointer`}
                                src={toAbsoluteUrl(`/media/svg/iconsFigma/Panorama.svg`)}
                            />
                    )
                    :
                    (

                        <OverlayTrigger
                            trigger="click"
                            placement="left"
                            overlay={popoverClick}
                        >
                            <div className="px-4 w-100 d-flex justify-content-center">
                                {
                                    data.url !== '' ? <Img360 data={data} /> :
                                        <img
                                            alt="Logo"
                                            width="100px"
                                            className={`max-h-100px cursor-pointer`}
                                            src={toAbsoluteUrl(`/media/svg/iconsFigma/Panorama.svg`)}
                                        />
                                }
                            </div>
                        </OverlayTrigger>
                    )
                }

            </div>

        </div >
    )
}

export default Picture