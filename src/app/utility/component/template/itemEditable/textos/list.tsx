/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { setDataList } from '../../../../../utility/global/index'
import ContentEditable from "react-contenteditable";
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
    data: any
    isDragging: any
    referencia: any
    handlerId: any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
    removeItem: (data : any) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => { 

  const { show } = useContextMenu({ id: "menu-id" });

  const changeText = (e : any) => { 

      const edit = {
          ...data,
          item: setDataList(e.target)
        }
      updateElement(edit)
  }

  const destroyItem = ( e : any) => {
    removeItem(e.triggerEvent.target.id);
    setEditItem([])
  }

  return (
        <div
          onContextMenu={show}
          ref={referencia}
          data-handler-id={handlerId}
          className="d-flex cursor-grabbing"
        >
          <div className="p-1 py-1 d-flex align-items-center">
            <i className="bi bi-grip-vertical fa-2x"/>
          </div>
          <div 
            ref={referencia}
            data-handler-id={handlerId}
            id={data.id}
            className={`w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
            contentEditable={!isDragging}
            suppressContentEditableWarning={true}
            onBlur={(e) => changeText(e)}
            onClick={() => setEditItem(data)}
          >
            <ul id={data.id} className={data.typeList ? `list-group ${data.typeList}` : ''}>
              <li id={data.id} className={data.typeList ? `list-group-item item-list` : ''}>{data.text}</li>
            </ul>
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

export default Text