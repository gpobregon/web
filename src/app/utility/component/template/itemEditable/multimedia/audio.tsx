/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'

type Model = {
    data: any
    referencia: any
    handlerId: any
    isDragging : any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
    removeItem: (data : any) => void
}
const Audio: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => { 
  
  const { show } = useContextMenu({ id: "menu-id" });  
  
  const changeText = (e : any) => {
        const edit = {
          ...data,
          text: e.target.value
        }
        updateElement(edit)
    }
  
    const destroyItem = ( e : any) => {
      removeItem(e.triggerEvent.target.id);
      setEditItem([])
    }

    return ( 
          <div
            onClick={() => setEditItem(data)} 
            onContextMenu={show}
            ref={referencia}
            data-handler-id={handlerId}
            className="d-flex cursor-grabbing"
          >
            <div className="p-1 py-1 d-flex align-items-center">
              <i className="bi bi-grip-vertical fa-2x"/>
            </div>
            <div id={data.id} className={`editable ${data.textAling} w-100`}>
                <audio controls autoPlay id={data.id}>
                    <source src={toAbsoluteUrl(data.url)} type="audio/ogg" />
                    <source src="horse.mp3" type="audio/mpeg" />
                        Su navegador no es compatible con el elemento de audio.
                </audio>
            </div>
            <Menu id={"menu-id"} theme="dark" data-test={data}>
              <Item onClick={(e : any) => destroyItem(e)}>
                <div>
                    <i className="bi bi-x-circle-fill text-danger pe-4"/>Quitar Elemento
                </div>
              </Item>
            </Menu>
          </div>
    )
}

export default Audio