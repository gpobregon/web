/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { setDataList } from '../../../../../utility/global/index'
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
  data: any
  isDragging: any
  referencia: any
  handlerId: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
  saveResourceElement: (data: string) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem, saveResourceElement }) => {

  const { show } = useContextMenu({ id: "menu-id" });
  const [dataSelect, setDataSelect] = useState<any>([])

  const changeText = (e: any) => {
    const edit = {
      ...data,
      content: e.target.value
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
      className="d-flex cursor-grabbing"
    >
      <div
        className="p-1 py-1 d-flex align-items-center"
        id={data.id}
        onContextMenu={(e: any) => OpenMenu(e, data)}
      >
        <i className="bi bi-grip-vertical fa-2x" id={data.id} />
      </div>
      <Menu id={"menu-id"} theme="dark" data-test={data}>
        <Item onClick={(e: any) => destroyItem(e)}>
          <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
        </Item>
        <Item onClick={(e: any) => saveElement(e)}>
          <i className="fa fa-save text-success pe-4" />Guardar Recurso
        </Item>
      </Menu>
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