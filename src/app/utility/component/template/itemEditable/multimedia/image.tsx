/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging : any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data : any) => void
}
const Picture: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => { 
  
  const { show } = useContextMenu({ id: "menu-id" });  
  
    const destroyItem = ( e : any) => {
      removeItem(e.triggerEvent.target.id);
      setEditItem([])
    }

    return ( 
          <div
            onClick={() => setEditItem(data)} 
            ref={referencia}
            data-handler-id={handlerId}
            className="d-flex cursor-grabbing"
          >
            <div className="p-1 py-1 d-flex align-items-center" id={data.id} onContextMenu={show}>
              <i className="bi bi-grip-vertical fa-2x" id={data.id}/>
            </div>
            <Menu id={"menu-id"} theme="dark" data-test={data}>
              <Item onClick={(e : any) => destroyItem(e)}>
                <div>
                    <i className="bi bi-x-circle-fill text-danger pe-4"/>Quitar Elemento
                </div>
              </Item>
            </Menu>
            <div  className={`editable ${data.textAling} w-100`}>
              <img src={!data.url ? toAbsoluteUrl("/media/png/picture.png") : data.url } alt="" className="w-50"/>
            </div>
            
          </div>
    )
}

export default Picture