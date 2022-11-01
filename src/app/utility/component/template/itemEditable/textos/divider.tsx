/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from "react";
import { useContextMenu } from "react-contexify";
import ContextMenu from '../../../menu/contextMenu'

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
}
const Divider: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

  const idMenu = `menu-${data.id}`

  const { show } = useContextMenu({ id: idMenu })

  const [dataSelect, setDataSelect] = useState<any>([])

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
      onClick={() => setEditItem(data)}
      className={`d-flex cursor-grabbing ${isDragging ? 'editable' : ''}`}
    >
      <div
        className="p-1 py-1 d-flex align-items-center"
        id={data.id}
        onContextMenu={(e: any) => OpenMenu(e, data)}
      >
        <i className="bi bi-grip-vertical fa-2x" id={data.id} />
      </div>
      <ContextMenu
        destroyItem={destroyItem}
        idMenu={idMenu}
      />
      <div className="separator border-light my-10 w-100"></div>
    </div>
  )
}

export default Divider