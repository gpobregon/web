/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from "react";
import ContentEditable from "react-contenteditable";
import MenuDoubleClick from '../../../menu/doubleClick'
import ContextMenu from '../../../menu/contextMenu'
import { useContextMenu } from "react-contexify";

type Model = {
  data: any
  isDragging: any
  referencia: any
  handlerId: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

  const idMenu = `menu-${data.id}`
  const nameMenu = `custom-${data.id}`

  const { show } = useContextMenu({ id: idMenu });

  const { show: showMenu2 } = useContextMenu({ id: nameMenu });

  const [dataSelect, setDataSelect] = useState<any>([])

  const changeText = (e: any) => {
    
    const edit = {
      ...data,
      content: e.target.value,
      item: Convert(e.target.value)
    }
    updateElement(edit)
  }
  
  const Convert = (str: any) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    const children = doc.childNodes[0].childNodes[1].childNodes[0].childNodes;
    let nodes = []
    for (let i = 0; i < children.length; i++) {
      let text = children[i].childNodes[0].nodeValue;
      if (text) {
        nodes.push({ text: `${data.typeList === "" ? '* ' : `${i+=1}. ` }${text}` });
      }
    }
    return (nodes)
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
      <ContentEditable
        id={data.id}
        className={`p-1 lex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
        html={`${data.content}`} // innerHTML of the editable div
        disabled={isDragging} // use true to disable edition
        onChange={changeText} // handle innerHTML change
        onClick={() => setEditItem(data)}
      />
    </div>
  )
}

export default Text