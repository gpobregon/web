/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
}
const Audio: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

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
          <div>
            <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
          </div>
        </Item>
        <Item >
          <i className="fa fa-save text-success pe-4" />Guardar Recurso
        </Item>
      </Menu>
      <div className={`editable ${data.textAling} w-100`}>
        {
          data.url ?
            (<audio controls>
              <source src={data.url} type="audio/ogg" />
              <source src={data.url} type="audio/mpeg" />
              <source src={data.url} type="audio/mp3" />
              Su navegador no es compatible con el elemento de audio.
            </audio>)
            :
            (<audio controls>
              Su navegador no es compatible con el elemento de audio.
            </audio>)
        }
      </div>
      <Menu id={"menu-id"} theme="dark" data-test={data}>
        <Item onClick={(e: any) => destroyItem(e)}>
          <div>
            <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
          </div>
        </Item>
      </Menu>
    </div>
  )
}

export default Audio