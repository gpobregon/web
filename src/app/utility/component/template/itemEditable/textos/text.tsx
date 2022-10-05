/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from "react";
import ContentEditable from "react-contenteditable";
import { stripHtml } from '../../../../../utility/global/index';
import { useContextMenu } from "react-contexify";
import MenuDoubleClick from '../../../menu/doubleClick'
import ContextMenu from '../../../menu/contextMenu'

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
  saveResourceElement: (data: string) => void
}
const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem, saveResourceElement }) => {
  
  const idMenu = `menu-${data.id}`
  const nameMenu = `custom-${data.id}`

  const { show } = useContextMenu({ id: idMenu });
  
  const { show: showMenu2 } = useContextMenu({ id:  nameMenu });

  const [dataSelect, setDataSelect] = useState<any>([])
  
  const changeText = (e: any) => {
    const edit = {
      ...data,
      text: stripHtml(e.target.value)
    }
    updateElement(edit)
  }

  const destroyItem = (e: any) => {
    removeItem(dataSelect.id);
    setEditItem([])
  }

  const saveElement = (e: any) => {
    saveResourceElement(e.triggerEvent.target.id)
  }

  const OpenMenu = (e: any, data: any) => {
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
        saveElement={saveElement}
        idMenu={idMenu}
      />
      <MenuDoubleClick 
        updateElement={updateElement}
        nameMenu={nameMenu}
        editItem={data}
      />
      <ContentEditable
        id={data.id}
        className={`p-1 lex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
        html={`${data.text}`} // innerHTML of the editable div
        disabled={isDragging} // use true to disable edition
        onChange={changeText} // handle innerHTML change
        onClick={() => setEditItem(data)}
      />
    </div>
  )
}

export default Text