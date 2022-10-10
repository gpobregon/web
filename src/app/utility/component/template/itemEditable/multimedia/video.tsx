/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState } from "react";
import Masonry from 'react-masonry-css'
import Videos from '../../../resource/video'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { Menu, Item, useContextMenu } from "react-contexify";
import { ContentContext } from '../../../../../modules/template/movil/context'

type Model = {
  data: any
  referencia: any
  handlerId: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
}
const Video: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

  const { allResources, destroyOneResource, changeTypeEdit } = useContext(ContentContext)
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
    <Popover id="popover-basic" style={{ transform: 'translate(-366px, 317px)', width: '358px' }}>
      <Popover.Header as="h3">Videos</Popover.Header>
      <Popover.Body>
        <PerfectScrollbar style={{ height: '250px', maxWidth: '400px', width: '100%' }} className="min-tumnail px-4">
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {
              allResources.map((file: any, index: number) => {
                return (
                  file.tipo.includes('video/') && <Videos key={index} item={file} selected={selected} setSelected={setSelected} />
                )
              })
            }
          </Masonry>
        </PerfectScrollbar>
      </Popover.Body>
      <hr />
      <Popover.Header>
        <div className="d-flex">
          <div className="flex-shrink-1 px-4 d-flex justify-content-center align-items-center">
            <i className="bi bi-trash text-danger fs-2 cursor-pointer" onClick={() => removeImage()} />
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
      <Menu id={idMenu} theme="dark" data-test={data}>
        <Item onClick={(e: any) => destroyItem(e)}>
          <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
        </Item>
      </Menu>
      <div id={data.id} className={`editable d-flex justify-content-center ${data.textAling} w-100`}>
        {
          !data.url && changeTypeEdit === 1 &&
          (
            <div className="bkg-dark content-icon rounded my-2 text-center" >
              <div className="icon-wrapper">
                <i className={`bi bi-film fa-4x text-white`}></i>
              </div>
            </div>
          )
        }

        {
          data.url && changeTypeEdit === 1 && (
            <video width="100%" height="240" controls className={`rounded ${data.borderRadius} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
              <source src={data.url} type="video/mp4" />
              <source src={data.url} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          )
        }

        {
          changeTypeEdit === 2 &&
          (
            <OverlayTrigger
              trigger="click"
              placement="left"
              overlay={popoverClick}
            >
              {
                !data.url ?
                  (
                    <div className="bkg-dark content-icon rounded my-2 text-center" >
                      <div className="icon-wrapper">
                        <i className={`bi bi-film fa-4x text-white`}></i>
                      </div>
                    </div>
                  ) : (
                    <video width="90%" height="240" controls className={`rounded ${data.borderRadius} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
                      <source src={data.url} type="video/mp4" />
                      <source src={data.url} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  )
              }
            </OverlayTrigger>
          )
        }

      </div>
    </div>
  )
}

export default Video