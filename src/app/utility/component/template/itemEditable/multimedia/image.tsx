/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useRef } from "react";
import Masonry from 'react-masonry-css'
import Image from '../../../resource/image'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Popover, OverlayTrigger } from 'react-bootstrap'
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

  const { allResources, destroyOneResource, changeTypeEdit } = useContext(ContentContext)

  const breakpointColumnsObj = { default: 2, 1100: 2, 700: 2, 500: 2 }

  const idMenu = `menu-${data.id}`

  const { show } = useContextMenu({ id: idMenu })

  const destroyItem = (e: any) => {
    removeItem(e.triggerEvent.target.id);
    setEditItem([])
  }

  const popoverClick = (
    <Popover id="popover-basic" style={{ transform: 'translate(-366px, 317px)', maxWidth: '358px' }}>
      <Popover.Header as="h3">Imágenes</Popover.Header>
      <Popover.Body>
        <PerfectScrollbar style={{ height: '310px', maxWidth: '485.px', width: '100%' }} className="min-tumnail px-4">
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {
              allResources.map((file: any, index: number) => {
                return (
                  file.tipo.includes('image/') && <Image key={index} item={file} destroyOneResource={destroyOneResource} />
                )
              })
            }
          </Masonry>
        </PerfectScrollbar>
      </Popover.Body>
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

      <div className={`editable ${data.textAling} w-100`}>
        {changeTypeEdit === 1 ?
          (<img src={!data.url ? toAbsoluteUrl("/media/png/picture.png") : data.url} alt="" className="w-75 rounded" />)
          :
          (<OverlayTrigger
            trigger="click"
            placement="left"
            overlay={popoverClick}
          >
            <img src={!data.url ? toAbsoluteUrl("/media/png/picture.png") : data.url} alt="" className="w-75 rounded" />
          </OverlayTrigger>)
        }

      </div>

    </div >
  )
}

export default Picture