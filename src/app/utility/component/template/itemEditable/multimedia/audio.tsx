/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState } from "react";
import Masonry from 'react-masonry-css'
import Audios from '../../../resource/audios'
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
const Audio: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

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
    <Popover id="popover-basic" style={{ transform: 'translate(-366px, 317px)', width: '358px' }}>
      <Popover.Header as="h3">Audios</Popover.Header>
      <Popover.Body>
        <PerfectScrollbar style={{ height: '250px', maxWidth: '400px', width: '100%' }} className="min-tumnail px-4">
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {
              allResources.map((file: any, index: number) => {
                console.log(file.tipo)
                return (
                  file.tipo.includes('audio/') && <Audios key={index} item={file} selected={selected} setSelected={setSelected} />
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
            <audio controls>
              Su navegador no es compatible con el elemento de audio.
            </audio>
          )
        }

        {
          data.url && changeTypeEdit === 1 && (
            <audio controls>
              <source src={data.url} type="audio/ogg" />
              <source src={data.url} type="audio/mpeg" />
              <source src={data.url} type="audio/mp3" />
              Su navegador no es compatible con el elemento de audio.
            </audio>
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
              <div className="px-2">
                {
                  !data.url ?
                    (
                      <audio controls>
                        Su navegador no es compatible con el elemento de audio.
                      </audio>
                    ) : (
                      <audio controls>
                        <source src={data.url} type="audio/ogg" />
                        <source src={data.url} type="audio/mpeg" />
                        <source src={data.url} type="audio/mp3" />
                        Su navegador no es compatible con el elemento de audio.
                      </audio>
                    )
                }
              </div>
              
            </OverlayTrigger>
          )
        }

      </div>
    </div>
  )
}

export default Audio